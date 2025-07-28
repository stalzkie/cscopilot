import React from "react";
import { useTypewriter } from "../hook/useTypewriter";

interface TypingBubbleProps {
  text: string;
}

const TypingBubble: React.FC<TypingBubbleProps> = ({ text }) => {
  const typedText = useTypewriter(text, 40); // Adjust speed if needed

  return (
    <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-lg max-w-[80%] my-2">
      <p style={{ whiteSpace: "pre-wrap" }}>{typedText}</p>
    </div>
  );
};

export default TypingBubble;
