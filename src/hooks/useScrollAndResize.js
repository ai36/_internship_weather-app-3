import { useEffect } from "react";

export function useScrollAndResize(updateButtons, contentRef) {
  useEffect(() => {
    const elem = contentRef.current;
    if (!elem) return;

    updateButtons();

    const onScroll = () => updateButtons();
    elem.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      updateButtons();
      if (contentRef.current) {
        contentRef.current.scrollTo({ left: 0 });
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      elem.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [contentRef, updateButtons]);
}