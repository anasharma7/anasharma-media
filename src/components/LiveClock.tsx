"use client";

import { useEffect, useState } from "react";

// Cycles through a list of short status fragments every few seconds
const FRAGMENTS = [
  "AI & COGNITION",
  "INTERNET CULTURE",
  "DIGITAL BEHAVIOR",
  "POWER STRUCTURES",
  "COGNITIVE INEQUALITY",
  "ONLINE IDENTITY",
  "THE AI TRANSITION",
  "HUMAN BEHAVIOR ONLINE",
  "EMOTIONAL ARCHITECTURE",
  "ATTENTION ECONOMY",
];

export default function LiveClock() {
  const [time, setTime] = useState<string>("");
  const [fragment, setFragment] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setFragment((f) => (f + 1) % FRAGMENTS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      style={{
        fontFamily: 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
        fontSize: "0.62rem",
        color: "#2a2826",
        letterSpacing: "0.08em",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <span style={{ color: "#1e1c1a" }}>{time}</span>
      <span style={{ color: "#181614" }}>·</span>
      <span
        style={{
          color: "#1e1c1a",
          transition: "opacity 0.4s",
        }}
      >
        {FRAGMENTS[fragment]}
      </span>
    </span>
  );
}
