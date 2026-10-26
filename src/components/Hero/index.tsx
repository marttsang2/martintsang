import { site } from "@/content";
import SCurve from "@/components/SCurve";

export default function Hero() {
  return (
    <>
      <section id="top" className="bg-ink text-on-ink">
        <div className="frame grid-12 gap-y-8 pb-12 lg:pb-[clamp(16px,2vw,32px)] pt-[clamp(48px,11vw,160px)] md:gap-y-10">
          <h1 className="hero-rise col-span-12 whitespace-nowrap t-display [--i:3] max-lg:mb-4 lg:row-start-2 lg:mt-[clamp(48px,7vw,120px)] max-lg:[--i:0]">
            Martin <br className="sm:hidden" />
            Tsang
          </h1>
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <p className="hero-rise t-statement [--i:0] max-lg:[--i:1]">{site.statement}</p>
            <p className="hero-rise mt-6 flex items-center gap-3 t-small text-on-ink-soft [--i:1] max-lg:[--i:2]">
              <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-honey" />
              {site.availability}
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
            <p className="hero-rise max-w-[52ch] [--i:1] max-lg:[--i:2]">{site.intro}</p>
            <div className="hero-rise mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 [--i:2] max-lg:[--i:3]">
              <a href={`mailto:${site.email}`} className="button max-sm:w-full max-sm:justify-center">
                Get in touch
              </a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="link t-small font-medium">
                GitHub <span className="arrow" aria-hidden>↗</span>
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link t-small font-medium">
                LinkedIn <span className="arrow" aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <SCurve />
    </>
  );
}
