import { useEffect, useRef, useState } from "react";

/**
 * Hook that detects when an element is in the viewport using IntersectionObserver
 * Used to optimize 3D Canvas rendering by only rendering when visible
 *
 * @param threshold - Percentage of element that must be visible (0.0 to 1.0)
 * @param rootMargin - Margin around root viewport (e.g., "100px" to trigger earlier)
 * @param keepMounted - If true, keeps component mounted but returns visibility state (prevents animation jumps)
 * @returns Object with ref to attach to element and isInViewport boolean
 *
 * @example
 * // Unmount when off-screen (saves most resources, but may cause jumps)
 * const { ref, isInViewport } = useInViewport(0.1);
 * return <div ref={ref}>{isInViewport && <Canvas>...</Canvas>}</div>
 *
 * @example
 * // Keep mounted but track visibility (smooth animations, moderate resource usage)
 * const { ref, isInViewport } = useInViewport(0.1, '0px', true);
 * return <div ref={ref}><Canvas frameloop={isInViewport ? 'always' : 'never'}>...</Canvas></div>
 */
export const useInViewport = (
  threshold = 0.1,
  rootMargin = "0px",
  keepMounted = false,
) => {
  const ref = useRef<HTMLDivElement>(null);
  // If keepMounted is true, start as visible to avoid initial jump
  const [isInViewport, setIsInViewport] = useState(keepMounted ? true : false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { ref, isInViewport };
};
