"use client";

import { thoughtBubbles } from "@/lib/site";

type Placement = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  delay: string;
  className: string;
};

// Defined normal floating placements for each bubble card
const placements: Placement[] = [
  { top: "4%", left: "1%", width: "21.5rem", delay: "0s", className: "bubble--blue" },
  { top: "7%", right: "1%", width: "20.5rem", delay: "0.25s", className: "bubble--earth" },
  { top: "19%", left: "4%", width: "20.5rem", delay: "0.4s", className: "bubble--mist" },
  { top: "23%", right: "3%", width: "19.5rem", delay: "0.15s", className: "bubble--blue" },
  { top: "39%", left: "1%", width: "22.5rem", delay: "0.35s", className: "bubble--earth" },
  { top: "44%", right: "2%", width: "20.5rem", delay: "0.55s", className: "bubble--mist" },
  { top: "60%", left: "4%", width: "20.5rem", delay: "0.6s", className: "bubble--luxe" },
  { top: "67%", right: "3%", width: "22.5rem", delay: "0.2s", className: "bubble--blue" },
];

export function ThoughtBubbles() {
  return (
    <div className="thought-scene">
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