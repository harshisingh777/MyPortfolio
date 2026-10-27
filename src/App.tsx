import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Profile from "./components/Profile";
import Work from "./components/work/Work";
import Journey from "./components/Journey";
import Toolkit from "./components/Toolkit";
import Contact from "./components/Contact";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  useSmoothScroll();

  return (
    <div className="grain relative min-h-screen w-full overflow-x-clip">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Profile />
        <Work />
        <Journey />
        <Toolkit />
        <Contact />
      </main>
    </div>
  );
}
