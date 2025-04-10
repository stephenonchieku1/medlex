import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface HealthChatProps {
  userSettings: any;
  selectedClarity: { id: string; label: string };
}

export default function HealthChat({ userSettings, selectedClarity }: HealthChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your health assistant. How can I help you with your health-related questions today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [suggestedQuestions] = useState([
    "What are common side effects of antibiotics?",
    "How can I manage my blood pressure naturally?",
    "What should I know about my medication interactions?",
    "How much exercise is recommended weekly?",
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsProcessing(true);

    try {
      // Format user settings for context
      const userSettingsText = `User Info:
Sex: ${userSettings.sex.charAt(0).toUpperCase() + userSettings.sex.slice(1)}
Medical Conditions: ${userSettings.conditions.join(", ") || "None specified"}
Age Range: ${userSettings.age.range}
Clarity Level: ${selectedClarity.label}
Language: ${userSettings.language.name}`;

      // Call your AI backend
      const response = await fetch("/api/health-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputMessage,
          userSettings: userSettingsText,
          history: messages.slice(-6), // Send last 6 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get a response");
      }

      const data = await response.json();

      // Add assistant response
      const assistantMessage: Message = {
        id: Date.now().toString() + "-assistant",
        content: data.response || "I apologize, but I couldn't process your request. Please try again.",
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Also send to Watson for logging/monitoring if that's how you're using it
      if (window.sendWatsonMessage) {
        await window.sendWatsonMessage(`User question: ${inputMessage}\nAssistant response: ${data.response}`);
      }
    } catch (error) {
      // Handle error
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  const toggleSpeechRecognition = () => {
    if (!isListening) {
      // Start listening
      setIsListening(true);
      
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        
        recognition.onresult = (event: { results: { transcript: any; }[][]; }) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
        };
        
        recognition.onerror = () => {
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.start();
      } else {
        alert("Speech recognition is not supported in your browser.");
        setIsListening(false);
      }
    } else {
      // Stop listening
      setIsListening(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-4 pb-3 border-b">
        <h2 className="text-xl font-semibold text-blue-600">Health Assistant</h2>
        <div className="flex gap-2">
          <p className="text-sm text-gray-500 italic">
            Always consult with healthcare professionals for medical advice
          </p>
        </div>
      </div>

      {/* Suggested questions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleSuggestedQuestion(question)}
            className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition"
          >
            {question}
          </button>
        ))}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs text-right mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-lg p-3 flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <p className="text-sm">Processing your request...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <button
          type="button"
          onClick={toggleSpeechRecognition}
          className={`p-2 rounded-full ${
            isListening ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask a health-related question..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={isProcessing}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
          disabled={!inputMessage.trim() || isProcessing}
        >
          <Send size={20} />
        </button>
      </form>
      
      <div className="mt-3 text-xs text-gray-500 text-center">
        This assistant provides general health information and is not a substitute for professional medical advice.
      </div>
    </div>
  );
}