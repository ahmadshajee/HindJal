"use client";

import { useState, useEffect } from "react";

export function TypewriterTitle() {
  const fullText = "A world without thirst should not be expensive.";
  const plainTextLength = 37; // Length of "A world without thirst should not be "
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Add intro-active blur wrapper class
    document.body.classList.add("intro-active");

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        index++;
        setDisplayedText(fullText.slice(0, index));
      } else {
        clearInterval(interval);
        setIsDone(true);
        // Remove blur wrapper class once typewriter completes
        document.body.classList.remove("intro-active");
      }
    }, 90);

    return () => {
      clearInterval(interval);
      document.body.classList.remove("intro-active");
    };
  }, []);

  const part1 = displayedText.slice(0, plainTextLength);
  const part2 = displayedText.slice(plainTextLength);

  return (
    <h1 className="hero-title typewriter-container">
      {part1}
      {part2.length > 0 && <span>{part2}</span>}
      <span className={`typewriter-cursor ${isDone ? "typewriter-cursor--done" : ""}`}>|</span>
    </h1>
  );
}
