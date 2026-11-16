import React, { useEffect, useState } from "react";

export const PetalOverlay = () => {
  const [petals, setPetals] = useState([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Generate randomized delicate rose petals
    const items = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7 + 3) % 94}%`,
      animationDuration: `${7 + (i % 6) * 1.5}s`,
      animationDelay: `${(i * 0.7) % 5}s`,
      size: 10 + (i % 8) * 2,
      opacity: 0.35 + (i % 4) * 0.12,
      rotateStart: (i * 45) % 360,
    }));
    setPetals(items);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-10"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="animate-petal"
          style={{
            left: petal.left,
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
            style={{ transform: `rotate(${petal.rotateStart}deg)` }}
          >
            <path
              d="M12 2C8 6 4 11 4 15C4 19.4 7.6 23 12 23C16.4 23 20 19.4 20 15C20 11 16 6 12 2Z"
              fill="#E8B4A2"
              fillOpacity="0.8"
            />
            <path
              d="M12 2C10 6 7 11 7 15C7 18 9 20 12 20"
              stroke="#D29986"
              strokeWidth="0.8"
              opacity="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
