// File: pages/api/health-chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize APIs (store API keys in environment variables)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, userSettings, history } = req.body;

    // Choose which AI to use based on query complexity or rotate between them
    // This example uses a simple approach - you could implement more sophisticated routing
    const aiChoice = Math.random();

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
- Consider the user's specific context: ${userSettings}
- Keep responses concise and focused on answering the user's question

If the user asks non-health related questions, politely redirect them to ask health-related questions only.`;

    let response;
    
    // OpenAI API
    if (aiChoice < 0.4) {
      const chatHistory = history.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          ...chatHistory,
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 800,
      });
      
      response = completion.choices[0].message.content;
    } 
    // Together AI
    else if (aiChoice < 0.7) {
      const formattedHistory = history.map((msg: any) => 
        `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`
      ).join('\n');
      
      const togetherResponse = await fetch('https://api.together.xyz/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`
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
      response = togetherData.choices[0].text.trim();
    } 
    // Gemini API
    else {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      
      const chatHistory = history.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
      
      const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      });
      
      const result = await chat.sendMessage(
        `${systemPrompt}\n\nUser Question: ${message}`
      );
      
      response = result.response.text();
    }

    return res.status(200).json({ response });
  } catch (error) {
    console.error('Health chat API error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}