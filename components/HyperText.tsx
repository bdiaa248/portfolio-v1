"use client";

import { useEffect, useRef, useState } from "react";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

export default function HyperText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const iterations = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((currentText) =>
        currentText
          .split("")
          .map((letter, index) => {
            if (index < iterations.current) {
              return text[index];
            }
            return ALPHABETS[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iterations.current >= text.length) {
        clearInterval(interval);
      }

      iterations.current += 1 / 3; // Control speed here
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-mono">{displayText}</span>;
}