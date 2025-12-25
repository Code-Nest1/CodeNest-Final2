import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const useScrollRestore = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useLayoutEffect(() => {
    // 1. Completely disable the browser's native scroll behavior 
    // This stops the browser from trying to land in the "middle"
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const savedPosition = sessionStorage.getItem(`scroll-${pathname}`);

    // --- CASE A: FORWARD NAVIGATION (Pushing to a New Page) ---
    // When you click a Service, Portfolio, or Blog
    if (navType === "PUSH" || navType === "REPLACE") {
      // Force it to Top 0 instantly
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      
      // Safety reset: Some React transitions delay the render.
      // We force a secondary Top-Zero to ensure no "middle-page" jumps.
      const forceTop = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 0);

      return () => clearTimeout(forceTop);
    }

    // --- CASE B: BACK NAVIGATION (Popping back to Services list) ---
    // When you click 'Back' to return to your previous scroll spot
    if (navType === "POP") {
      if (savedPosition) {
        const targetScroll = parseInt(savedPosition, 10);
        
        // Retry logic: We wait until the page is long enough to handle the scroll
        // This ensures if your list of 20 services takes time to load, it won't fail
        let scrollAttempts = 0;
        const attemptScroll = () => {
          window.scrollTo(0, targetScroll);
          scrollAttempts++;
          
          // If we haven't reached the saved height yet (page still rendering), try again
          if (window.scrollY < targetScroll - 1 && scrollAttempts < 15) {
            requestAnimationFrame(attemptScroll);
          }
        };
        requestAnimationFrame(attemptScroll);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, navType]);

  // Logic to save scroll position every time the user stops scrolling
  useLayoutEffect(() => {
    const handleSavePosition = () => {
      // Don't save if we are at the very top (reset clean)
      if (window.scrollY > 0) {
        sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
      }
    };

    window.addEventListener("scroll", handleSavePosition);
    return () => {
      // Save one last time when user leaves the page
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
      window.removeEventListener("scroll", handleSavePosition);
    };
  }, [pathname]);
};

export default useScrollRestore;