"use client";

import { useState } from "react";
import { thoughtBubbles } from "@/lib/site";

type Placement = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  delay: string;
  className: string;
  tx: string;
  ty: string;
  rz: string;
};

// Defined outward explosion trajectories for each bubble card
const placements: Placement[] = [
  { top: "0%", left: "1%", width: "20rem", delay: "0s", className: "bubble--blue", tx: "-360px", ty: "-220px", rz: "-20deg" },
  { top: "3%", right: "1%", width: "19rem", delay: "0.25s", className: "bubble--earth", tx: "360px", ty: "-220px", rz: "20deg" },
  { top: "16%", left: "4%", width: "19rem", delay: "0.4s", className: "bubble--mist", tx: "-420px", ty: "-70px", rz: "-15deg" },
  { top: "20%", right: "3%", width: "18rem", delay: "0.15s", className: "bubble--blue", tx: "420px", ty: "-70px", rz: "15deg" },
  { top: "37%", left: "1%", width: "21rem", delay: "0.35s", className: "bubble--earth", tx: "-420px", ty: "120px", rz: "-18deg" },
  { top: "42%", right: "2%", width: "19rem", delay: "0.55s", className: "bubble--mist", tx: "420px", ty: "120px", rz: "18deg" },
  { top: "59%", left: "4%", width: "19rem", delay: "0.6s", className: "bubble--luxe", tx: "-320px", ty: "280px", rz: "-12deg" },
  { top: "66%", right: "3%", width: "21rem", delay: "0.2s", className: "bubble--blue", tx: "320px", ty: "280px", rz: "12deg" },
];

export function ThoughtBubbles() {
  const [isExploded, setIsExploded] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  function handleExplode() {
    if (isExploded || isResetting) return;
    setIsExploded(true);

    // Fade bubbles back in after the explosion completes
    setTimeout(() => {
      setIsResetting(true);
      setIsExploded(false);
      setTimeout(() => {
        setIsResetting(false);
      }, 600); // Reset fade-in time
    }, 1800);
  }

  return (
    <div
      className={`thought-scene ${isExploded ? "scene--exploded" : ""} ${isResetting ? "scene--resetting" : ""}`}
      onClick={handleExplode}
      style={{ cursor: isExploded || isResetting ? "default" : "pointer" }}
      title="Click to explode!"
    >
      {thoughtBubbles.map((bubble, index) => {
        const placement = placements[index % placements.length];

        return (
          <div
            key={bubble.copy}
            className="bubble-wrapper"
            style={{
              top: placement.top,
              right: placement.right,
              bottom: placement.bottom,
              left: placement.left,
              width: placement.width,
              animationDelay: placement.delay,
              // Pass values to CSS
              // @ts-ignore
              "--explode-tx": placement.tx,
              // @ts-ignore
              "--explode-ty": placement.ty,
              // @ts-ignore
              "--explode-rz": placement.rz,
            }}
          >
            <article className={`bubble ${placement.className}`}>
              <span className="bubble__eyebrow">{bubble.eyebrow}</span>
              <p className="bubble__copy">“{bubble.copy}”</p>
            </article>
          </div>
        );
      })}
    </div>
  );
}