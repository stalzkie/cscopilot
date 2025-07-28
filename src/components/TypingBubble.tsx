import React, { useEffect, useState } from "react";

interface TypingBubbleProps {
  text: string;
}

const TypingBubble: React.FC<TypingBubbleProps> = ({ text }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    let current = "";
    setDisplayed(""); // Clear on new message

    const interval = setInterval(() => {
      if (i < text.length) {
        current += text[i];
        setDisplayed(current);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [text]);

  return <p className="whitespace-pre-wrap">{displayed}</p>;
};

export default TypingBubble;
