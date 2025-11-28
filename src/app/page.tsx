import Experiences from "@/components/Experiences";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background grid pattern */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />

      {/* Gradient orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10">
        <Hero />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
            <InfoCard />
            <div className="flex flex-col gap-0 flex-1 max-w-4xl">
              <Projects />
              <Experiences />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
