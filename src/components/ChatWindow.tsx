import React, { useState, useRef } from "react"; // Removed useEffect as it's no longer used
import TypingBubble from "./TypingBubble";
import { askGemini } from "../lib/gemini";
import { IconUser, IconRobot } from "@tabler/icons-react"; // Import icons for user and bot

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

  // Removed the automatic scroll on every message update.
  // The user can now scroll manually.
  // If automatic scrolling on new messages is desired,
  // more sophisticated logic would be needed to check if the user is already at the bottom.
  // useEffect(() => {
  //   messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <div className="relative flex flex-col h-full bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow-lg"> {/* Added h-full and rounded-lg/shadow for better appearance */}
      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-2">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start ${ // Added items-start to align icon and message at the top
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="flex-shrink-0 mr-2 mt-1"> {/* Icon for bot */}
                  <IconRobot className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </div>
              )}
              {msg.sender === "bot" ? (
                <TypingBubble text={msg.text} />
              ) : (
                <div className="bg-blue-500 text-white px-4 py-2 rounded-xl max-w-[80%] text-sm">
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              )}
              {msg.sender === "user" && (
                <div className="flex-shrink-0 ml-2 mt-1"> {/* Icon for user */}
                  <IconUser className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className={`flex ${messages.length > 0 && messages[messages.length - 1].sender === "user" ? "justify-start" : "justify-start"} items-center`}>
              {/* Show bot icon when thinking */}
              <div className="flex-shrink-0 mr-2 mt-1">
                 <IconRobot className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </div>
              <div className="text-sm text-gray-400 italic">Thinking...</div>
            </div>
          )}
          <div ref={messageEndRef} />
        </div>
      </div>

      {/* Input Bar with Clear Button on Left */}
      <div className="sticky bottom-0 w-full px-4 pb-6 pt-2 bg-transparent">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <button
            onClick={clearChat}
            className="text-sm font-medium px-3 py-2 rounded-full bg-white text-black opacity-50 hover:opacity-100 transition border border-gray-300 dark:bg-neutral-700 dark:text-white dark:border-gray-600"
          >
            Clear
          </button>
          <input
            type="text"
            className="flex-grow px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-neutral-700 dark:text-white"
            placeholder="Ask me about the CS Society of USLS..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className={`text-white text-sm font-medium px-4 py-2 rounded-full transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
