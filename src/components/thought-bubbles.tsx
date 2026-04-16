import { thoughtBubbles } from "@/lib/site";

const placements = [
  { top: "0%", left: "0%", width: "18rem", delay: "0s", className: "bubble--blue" },
  { top: "1%", right: "3%", width: "18rem", delay: "0.25s", className: "bubble--earth" },
  { top: "18%", left: "8%", width: "16rem", delay: "0.4s", className: "bubble--mist" },
  { top: "20%", right: "10%", width: "17rem", delay: "0.15s", className: "bubble--blue" },
  { top: "42%", left: "4%", width: "18rem", delay: "0.35s", className: "bubble--earth" },
  { top: "45%", right: "7%", width: "17rem", delay: "0.55s", className: "bubble--mist" },
  { bottom: "12%", left: "18%", width: "17rem", delay: "0.6s", className: "bubble--luxe" },
  { bottom: "8%", right: "18%", width: "18rem", delay: "0.2s", className: "bubble--blue" },
];

export function ThoughtBubbles() {
  return (
    <div className="thought-scene">
      {thoughtBubbles.map((bubble, index) => {
        const placement = placements[index % placements.length];

        return (
          <article
            key={bubble.copy}
            className={`bubble ${placement.className}`}
            style={{
              top: placement.top,
              right: placement.right,
              bottom: placement.bottom,
              left: placement.left,
              width: placement.width,
              animationDelay: placement.delay,
            }}
          >
            <span className="bubble__eyebrow">{bubble.eyebrow}</span>
            <p className="bubble__copy">“{bubble.copy}”</p>
          </article>
        );
      })}
    </div>
  );
}