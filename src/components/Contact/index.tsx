import { contact, site } from "@/content";
import TorontoTime from "./TorontoTime";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-0 bg-honey pt-section">
      <div className="frame grid-12 gap-y-10">
        <h2 data-reveal className="col-span-12 t-section md:col-span-9">
          {contact.title}
        </h2>
        <p data-reveal className="col-span-12 max-w-[36ch] [--i:1] md:col-span-8 md:t-statement lg:col-span-6">
          {contact.followUp} {contact.body}
        </p>

        <div data-reveal className="col-span-12 mt-[clamp(16px,4vw,64px)] [--i:2]">
          <a
            href={`mailto:${site.email}`}
            className="link inline-block font-medium tracking-[-0.03em] [font-size:var(--t-statement)] [text-decoration-color:var(--ink)] [text-decoration-thickness:3px] lg:[font-size:var(--t-section)] lg:tracking-[-0.045em]"
          >
            {site.email}
          </a>
        </div>

        <div data-reveal className="col-span-12 flex flex-wrap items-baseline gap-x-8 gap-y-3 [--i:3]">
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="link font-medium">
            GitHub <span className="arrow" aria-hidden>↗</span>
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link font-medium">
            LinkedIn <span className="arrow" aria-hidden>↗</span>
          </a>
          <TorontoTime />
        </div>
      </div>
    </section>
  );
}
