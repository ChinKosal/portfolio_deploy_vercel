import { useEffect } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import AnimatedLines from "./components/AnimatedLines";
import HeroV3 from "./components/HeroV3.jsx";

function App() {
  // Smooth scroll behavior
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.target.closest("a")?.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="text-white">
      {/* YouTube background music */}
      <div>
        <iframe
          width="0"
          height="0"
          src="https://www.youtube.com/embed/NvIXu1pXNZM?autoplay=1&loop=1&playlist=NvIXu1pXNZM&mute=1&enablejsapi=1"
          title="YouTube background music"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
      {/* <CustomCursor /> */}
      <Header />
      <HeroV3 />
      <About />
      <Skills />
      {/* <Projects /> */}
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
