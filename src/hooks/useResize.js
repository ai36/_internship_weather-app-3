import { useEffect, useRef } from "react";

export const useResize = (callback, ref) => {
  const rafId = useRef(0);

  useEffect(() => {
    const el = ref?.current ?? document.documentElement;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        callback();
      });
    });

    observer.observe(el);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, [callback, ref]);
};
