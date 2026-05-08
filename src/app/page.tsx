import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import CtaStrip from "@/components/CtaStrip";
import Experiences from "@/components/Experiences";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Industries from "@/components/Industries";
import Logos from "@/components/Logos";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <CtaStrip />
      <Logos />
      <CaseStudies />
      <Experiences />
      <Projects />
      <Skills />
      <Industries />
      <Contact />
      <Footer />
    </>
  );
}
