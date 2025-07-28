import React, { useState, useRef, useEffect } from "react";
import TypingBubble from "./TypingBubble";
import { askGemini } from "../lib/gemini";
import { IconUser, IconRobot, IconSend, IconTrash } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

const ChatWindow: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const speakText = (text: string) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    synth.speak(utter);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botReply = await askGemini(input);
      const botMessage: ChatMessage = { sender: "bot", text: botReply };
      setMessages((prev) => [...prev, botMessage]);
      speakText(botReply);
    } catch {
      const errorMessage: ChatMessage = {
        sender: "bot",
        text: "Oops! Something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const clearChat = () => {
    window.speechSynthesis.cancel();
    setMessages([]);
    setInput("");
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <IconRobot className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-3"
            >
              Welcome to CoPilot.CS!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-300 mb-6"
            >
              I'm here to help you learn about the Computer Science Society at USLS. 
              Ask me about our events, officers, programs, or anything CS-related!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2 justify-center text-sm"
            >
              {["Tell me about CSS", "Who are the officers?", "Upcoming events", "CS programs"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 hover:text-white transition-all duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <IconRobot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[80%] ${msg.sender === "user" ? "order-1" : ""}`}>
                  {msg.sender === "bot" ? (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl rounded-tl-md p-4">
                      <TypingBubble text={msg.text} />
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl rounded-tr-md p-4">
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full flex items-center justify-center order-2">
                    <IconUser className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <IconRobot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl rounded-tl-md p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <span className="text-gray-300 text-sm">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messageEndRef} />
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
              title="Clear chat"
            >
              <IconTrash className="w-5 h-5" />
            </button>
          )}
          
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200"
              placeholder="Ask me anything about CSS USLS..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
          </div>
          
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-3 rounded-full transition-all duration-200 ${
              isLoading || !input.trim()
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white hover:scale-105"
            }`}
          >
            <IconSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
