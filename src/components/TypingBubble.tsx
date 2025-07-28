import React from "react";
import { useTypewriter } from "../hook/useTypewriter";

interface TypingBubbleProps {
  text: string;
}

const TypingBubble: React.FC<TypingBubbleProps> = ({ text }) => {
  const typedText = useTypewriter(text, 25); // Reduced from 40ms to 25ms for faster typing

  return (
    <div className="text-gray-100">
      <p style={{ whiteSpace: "pre-wrap" }}>{typedText}</p>
    </div>
  );
};

export default TypingBubble;
