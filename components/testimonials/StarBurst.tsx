import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Star {
  id: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
}

export function StarBurst({ show }: { show: boolean }) {
  const MAX_STARS = 100;
  const [stars, setStars] = useState<Star[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const clearTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoveringRef = useRef<boolean>(false);

  useEffect(() => {
    hoveringRef.current = show;

    if (show) {
      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current);
        clearTimeoutRef.current = null;
      }

      intervalRef.current = setInterval(() => {
        if (!hoveringRef.current) return;

        const newStars: Star[] = Array.from({ length: 10 }).map((_, i) => ({
          id: Date.now() + i,
          x: (Math.random() - 0.5) * 600,
          y: (Math.random() - 0.5) * 400,
          rotation: Math.random() * 520,
          delay: Math.random() * 0.1,
        }));
        setStars((prev) => [...prev.slice(-MAX_STARS + 10), ...newStars]);
      }, 300);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current);
      }

      clearTimeoutRef.current = setTimeout(() => {
        if (!hoveringRef.current) {
          setStars([]);
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current);
        clearTimeoutRef.current = null;
      }
    };
  }, [show]);

  return (
    <div className="absolute pointer-events-none inset-0 flex justify-center items-center">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-6 h-6 opacity-0 animate-starburst"
          style={{
            '--x': `${star.x}px`,
            '--y': `${star.y}px`,
            '--rotation': `${star.rotation}deg`,
            animationDelay: `${star.delay}s`,
          } as React.CSSProperties}
        >
          <Image src="/Star.png" alt="star" width={24} height={24} />
        </div>
      ))}
    </div>
  );
}
