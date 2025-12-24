import { useEffect, useRef, useState } from "react";

interface UseAutoplayOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useAutoplayOnScroll = (
  id: number,
  options: UseAutoplayOnScrollOptions = {}
) => {
  const { threshold = 0.6, rootMargin = "0px" } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          setIsVisible(true);
          if (!hasPlayed) {
            setHasPlayed(true);
          }
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.6, 0.75, 1],
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, hasPlayed]);

  return { ref, isVisible, hasPlayed };
};
