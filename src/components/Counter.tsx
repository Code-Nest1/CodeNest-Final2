"use client";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  duration?: number; // animation duration in ms
  suffix?: string;
  className?: string;
}

export default function Counter({ end, duration = 1500, suffix = "", className }: CounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true; // prevents re-trigger  
          let start = 0;
          const startTime = performance.now();

          const animate = (time: number) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const currentValue = Math.floor(progress * end);
            setValue(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
