import MeshBackground from "./components/MeshBackground";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Process from "./components/Process";
import Skills from "./components/Skills";
import Playground from "./components/Playground";
import Contact from "./components/Contact";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  useSmoothScroll();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <MeshBackground />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Process />
        <Skills />
        <Playground />
        {/* Testimonials section intentionally omitted — add it back only
            once Harshi has real, attributable testimonials to include. */}
        <Contact />
      </main>
    </div>
  );
}
