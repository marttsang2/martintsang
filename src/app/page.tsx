import About from "@/components/About";
import Contact from "@/components/Contact";
import Experiences from "@/components/Experiences";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experiences />
      <Skills />
      <Contact />
    </>
  );
}
