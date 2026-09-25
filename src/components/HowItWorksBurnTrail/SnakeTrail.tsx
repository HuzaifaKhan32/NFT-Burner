import React, { useEffect, useState } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import FlameHead from "./FlameHead";
import { ThemeMode } from "../../types";

interface NodePairRef {
  top: HTMLDivElement | null;
  bottom: HTMLDivElement | null;
}

interface SnakeTrailProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  nodeRefs: React.MutableRefObject<NodePairRef[]>;
  stepCount: number;
  themeMode?: ThemeMode;
}

interface Point {
  x: number;
  y: number;
}

interface NodePairPoints {
  top: Point;
  bottom: Point;
}

function buildSnakePath(nodePairs: NodePairPoints[]): string {
  if (nodePairs.length < 2) return "";
  let d = "";
  for (let i = 0; i < nodePairs.length - 1; i++) {
    const start = nodePairs[i].bottom;
    const end = nodePairs[i + 1].top;
    const dy = end.y - start.y;
    
    // Deep, smooth cubic Bézier S-curve connecting bottom nub of card N to top nub of card N+1
    const cp1x = start.x;
    const cp1y = start.y + dy * 0.55;
    const cp2x = end.x;
    const cp2y = end.y - dy * 0.55;

    d += `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y} `;
  }
  return d.trim();
}

export default function SnakeTrail({ containerRef, nodeRefs, stepCount, themeMode = "dark" }: SnakeTrailProps) {
  const [pathData, setPathData] = useState("");
  const [box, setBox] = useState({ width: 0, height: 0 });
  const shouldReduceMotion = useReducedMotion();
  const isDark = themeMode === "dark";

  useEffect(() => {
    function measure() {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const pairs = nodeRefs.current.map(({ top, bottom }) => {
        if (!top || !bottom) return null;
        const t = top.getBoundingClientRect();
        const b = bottom.getBoundingClientRect();
        return {
          top: { x: t.left + t.width / 2 - containerRect.left, y: t.top + t.height / 2 - containerRect.top },
          bottom: { x: b.left + b.width / 2 - containerRect.left, y: b.top + b.height / 2 - containerRect.top },
        };
      });

      if (pairs.every(Boolean) && pairs.length === stepCount) {
        setPathData(buildSnakePath(pairs as NodePairPoints[]));
        setBox({ width: containerRect.width, height: containerRect.height });
      }
    }

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [containerRef, nodeRefs, stepCount]);

  // Adjusted offset range so progress is spread evenly across all 5 steps as user scrolls down
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.65", "end 0.85"],
  });

  if (!pathData) return null;

  return (
    <>
      <svg
        className="pointer-events-none absolute left-0 top-0 z-0 overflow-visible"
        width={box.width}
        height={box.height}
        viewBox={`0 0 ${box.width} ${box.height}`}
      >
        {/* The ONE dormant track — dashed pipe look with theme awareness */}
        <path
          d={pathData}
          stroke={isDark ? "rgba(212, 165, 116, 0.25)" : "#d8cdb8"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 10"
          fill="none"
        />

        {/* Blurred halo layer */}
        <motion.path
          d={pathData}
          stroke="#e8b164"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="1 10"
          fill="none"
          filter="url(#emberBlur)"
          opacity={0.55}
          style={{ pathLength: shouldReduceMotion ? 1 : scrollYProgress }}
        />

        {/* Crisp core ember layer */}
        <motion.path
          d={pathData}
          stroke="url(#emberGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 10"
          fill="none"
          style={{ pathLength: shouldReduceMotion ? 1 : scrollYProgress }}
        />

        <defs>
          <linearGradient id="emberGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9873f" />
            <stop offset="100%" stopColor="#ffcf8a" />
          </linearGradient>

          <filter id="emberBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.5" />
          </filter>
        </defs>
      </svg>

      <FlameHead pathData={pathData} progress={scrollYProgress} />
    </>
  );
}
