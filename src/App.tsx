import { useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
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
  // `revealed` starts the hero entrance; `loading` keeps the intro mounted
  // until its curtain has fully lifted.
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);
  useSmoothScroll(revealed);

  return (
    <div className="grain relative min-h-screen w-full overflow-x-clip">
      {loading && <Loader onReveal={() => setRevealed(true)} onDone={() => setLoading(false)} />}
      <CustomCursor />
      <Navbar />
      <main>
        <Hero ready={revealed} />
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
