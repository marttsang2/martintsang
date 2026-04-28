import About from "@/components/About";
import Contact from "@/components/Contact";
import Experiences from "@/components/Experiences";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <Hero />
      <About />
      <Projects />
      <Experiences />
      <Skills />
      <Contact />
    </div>
  );
}
