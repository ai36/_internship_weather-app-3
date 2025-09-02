import { useEffect } from "react";

export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const isInside = (e) => {
      const root = ref.current;
      if (!root) return false;
      const path = typeof e.composedPath === "function" ? e.composedPath() : null;
      return (path && path.includes(root)) || root.contains(e.target);
    };

    const onPointerDown = (e) => {
      if (!isInside(e)) {
        callback();
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        callback();
        if (document.activeElement && document.activeElement.blur) {
          document.activeElement.blur();
        }
      }
    };

    const onFocusIn = (e) => {
      if (!isInside(e)) {
        callback();
      }
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [ref, callback]);
};