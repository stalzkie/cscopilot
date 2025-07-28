import { useState, useEffect } from "react";

/**
 * useTypewriter
 * Displays text with a typewriter effect.
 *
 * @param text - The full text to animate
 * @param speed - Typing speed in milliseconds (default 40ms per character)
 * @returns The animated text string
 */
export function useTypewriter(text: string, speed: number = 40): string {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayed(""); // Reset when text changes

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(index));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval); // Cleanup on unmount or text change
  }, [text, speed]);

  return displayed;
}
