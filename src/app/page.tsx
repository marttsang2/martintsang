import Experiences from "@/components/Experiences";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto p-6 lg:px-0">
      <Hero />
      <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start lg:justify-center">
        <InfoCard />
        <div className="flex flex-col gap-20">
          <Projects />
          <Experiences />
        </div>
      </div>
    </div>
  );
}
