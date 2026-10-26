import { contact, site } from "@/content";
import TextLink from "@/components/TextLink";
import Words from "@/components/Words";

export default function Contact() {
  return (
    <section id="contact" data-chapter="honey" className="scroll-mt-0 bg-honey pt-section">
      <div className="frame grid-12 gap-y-10">
        <h2 data-lines className="col-span-12 t-section md:col-span-9">
          <Words text={contact.title} />
        </h2>
        <p data-reveal className="col-span-12 max-w-[36ch] [--i:1] md:col-span-8 md:t-statement lg:col-span-6">
          {contact.followUp} {contact.body}
        </p>

        <div data-reveal className="col-span-12 mt-[clamp(16px,4vw,64px)] [--i:2]">
          <TextLink
            href={`mailto:${site.email}`}
            className="font-medium tracking-[-0.03em] [--line-rest:1] [--line-weight:3px] [font-size:var(--t-statement)] lg:tracking-[-0.045em] lg:[font-size:var(--t-section)]"
          >
            {site.email}
          </TextLink>
        </div>

        <div data-reveal className="col-span-12 flex flex-wrap items-baseline gap-x-8 gap-y-3 [--i:3]">
          <TextLink href={site.github} className="font-medium">
            GitHub
          </TextLink>
          <TextLink href={site.linkedin} className="font-medium">
            LinkedIn
          </TextLink>
          <p className="t-small">{contact.where}</p>
        </div>
      </div>
    </section>
  );
}
