// File: src/pages/api/health-chat.ts
import type { APIRoute } from 'astro';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Define interfaces for our message types
interface ChatMessage {
  sender: 'user' | 'assistant' | string;
  content: string;
}

interface OpenAIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY || ''
});

// Initialize Gemini with API key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY || '');

// Together API key from environment variables
const TOGETHER_API_KEY = import.meta.env.TOGETHER_API_KEY || '';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the request body
    const body = await request.json();
    const { message, userSettings, history = [] } = body;

    // Create system prompt for health-focused chat
    const systemPrompt = `You are a helpful health information assistant that provides general health information to users. 
You should:
- Only answer health-related questions
- Provide evidence-based information when possible
- Clearly state when information is general and not medical advice
- Encourage users to consult healthcare professionals for diagnosis, treatment, or medical advice
- Be respectful and compassionate about health concerns
- Use language that is accessible based on the user's preferred clarity level
- Avoid making definitive medical diagnoses or prescribing treatments
- Consider the user's specific context: ${userSettings || 'No specific context provided'}
- Keep responses concise and focused on answering the user's question

If the user asks non-health related questions, politely redirect them to ask health-related questions only.`;

    let response: string | null = null;
    let error: unknown = null;
    
    // Try Gemini first
    if (import.meta.env.GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        
        if (history.length > 0) {
          // Process history in a way that ensures it starts with a user message
          // Filter to only valid entries and ensure proper format
          const formattedHistory = (history as ChatMessage[])
            .filter(msg => msg && typeof msg === 'object' && msg.sender && msg.content)
            .map((msg: ChatMessage) => ({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.content }]
            }));
          
          // Check if we can use the history - if first message is from user
          if (formattedHistory.length > 0 && formattedHistory[0].role === 'user') {
            // Use chat session with history
            const chat = model.startChat({
              history: formattedHistory as any,
            });
            
            const result = await chat.sendMessage(message);
            response = result.response.text();
          } else {
            // No valid history, use simple generate
            const result = await model.generateContent([
              { text: `${systemPrompt}\n\nUser Question: ${message}` }
            ]);
            response = result.response.text();
          }
        } else {
          // No history, use simple generate
          const result = await model.generateContent([
            { text: `${systemPrompt}\n\nUser Question: ${message}` }
          ]);
          response = result.response.text();
        }
      } catch (err) {
        console.log("Gemini API error, attempting fallback", err);
        error = err;
      }
    }
    
    // If Gemini failed, try OpenAI
    if (!response && import.meta.env.OPENAI_API_KEY) {
      try {
        // Format chat history for OpenAI
        const chatHistory = (history as ChatMessage[])
          .filter(msg => msg && typeof msg === 'object' && msg.sender && msg.content)
          .map((msg: ChatMessage): OpenAIMessage => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content
          }));
        
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            ...chatHistory,
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 800,
        });
        
        response = completion.choices[0].message.content || '';
      } catch (err) {
        console.log("OpenAI API error, attempting final fallback", err);
        error = err;
      }
    }
    
    // If both failed, try Together AI with robust error handling
    if (!response && TOGETHER_API_KEY) {
      try {
        const formattedHistory = (history as ChatMessage[])
          .filter(msg => msg && typeof msg === 'object' && msg.sender && msg.content)
          .map((msg: ChatMessage) => 
            `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`
          ).join('\n');
        
        const togetherResponse = await fetch('https://api.together.xyz/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOGETHER_API_KEY}`
          },
          body: JSON.stringify({
            model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
            prompt: `${systemPrompt}\n\n${formattedHistory}\n\nHuman: ${message}\n\nAssistant:`,
            max_tokens: 800,
            temperature: 0.7,
            top_p: 0.9,
          }),
        });
        
        const togetherData = await togetherResponse.json();
        
        // Add robust error checking
        if (togetherData && 
            togetherData.choices && 
            Array.isArray(togetherData.choices) && 
            togetherData.choices.length > 0 && 
            togetherData.choices[0].text) {
          response = togetherData.choices[0].text.trim();
        } else {
          throw new Error("Invalid response format from Together API");
        }
      } catch (err) {
        console.log("Together API error, all fallbacks failed", err);
        error = err;
      }
    }
    
    // If we have a response, return it
    if (response) {
      return new Response(
        JSON.stringify({ response }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // Provide a graceful fallback response when all APIs fail
      console.error('All AI APIs failed:', error);
      
      const fallbackResponse = `I apologize, but I'm currently experiencing technical difficulties connecting to my knowledge sources. Please try again later or contact support if this issue persists. Your question was about health information, and we want to make sure you get accurate information when our systems are fully operational.`;
      
      return new Response(
        JSON.stringify({ 
          response: fallbackResponse,
          apiStatus: 'degraded',
          error: error instanceof Error ? error.message : 'Unknown error' 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Health chat API error:', error);
    
    // Even if we have a catastrophic error, send a helpful message to the user
    const emergencyFallback = `I apologize, but I'm currently unable to process your request due to a technical issue. Please try again later or contact support if this issue persists.`;
    
    return new Response(
      JSON.stringify({ 
        response: emergencyFallback,
        apiStatus: 'error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}