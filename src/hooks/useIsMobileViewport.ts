import { useEffect, useState } from "react";

/**
 * True below the given breakpoint. Used to gate WebGL rendering — per the
 * 3D performance budget, the canvas never mounts on mobile-width viewports.
 */
export function useIsMobileViewport(breakpointPx = 768): boolean {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpointPx : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpointPx);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpointPx]);

  return isMobile;
}
