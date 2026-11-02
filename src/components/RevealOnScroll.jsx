import { useEffect } from "react";
import { useLocation } from "react-router";

function RevealOnScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const targets = document.querySelectorAll("[data-reveal], [data-reveal-line]");

    // Fallback for very old browsers: show everything immediately
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => (el.dataset.visible = "true"));
      return;
    }

    root.classList.add("reveal-ready");   // only hide things once this is running

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = "true";
            observer.unobserve(entry.target);   // animate once, not every time
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

export default RevealOnScroll;