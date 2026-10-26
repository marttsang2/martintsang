import { site } from "@/content";
import SCurve from "@/components/SCurve";
import TextLink from "@/components/TextLink";

export default function Hero() {
  return (
    <>
      <section id="top" data-chapter="ink" data-hero className="bg-ink text-on-ink [--line-hover:var(--honey)]">
        <div className="frame grid-12 gap-y-8 pb-12 lg:pb-[clamp(16px,2vw,32px)] pt-[clamp(36px,calc(11vw_-_16px),144px)] md:gap-y-10">
          <h1
            data-progress="exit"
            className="hero-name col-span-12 whitespace-nowrap t-display [--i:3] max-lg:mb-4 lg:row-start-2 lg:mt-[clamp(48px,7vw,120px)] max-lg:[--i:0]"
          >
            <span data-hero-layer className="hero-layer">
              <span className="word">
                <span className="word-in">Martin</span>
              </span>{" "}
              <br className="sm:hidden" />
              <span className="word">
                <span className="word-in [--w:1]">Tsang</span>
              </span>
            </span>
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
              <a href={`mailto:${site.email}`} data-magnet className="button max-sm:w-full max-sm:justify-center">
                Get in touch
              </a>
              <TextLink href={site.github} className="t-small font-medium">
                GitHub
              </TextLink>
              <TextLink href={site.linkedin} className="t-small font-medium">
                LinkedIn
              </TextLink>
            </div>
          </div>
        </div>
      </section>
      <SCurve />
    </>
  );
}
