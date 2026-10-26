import Image from "next/image";
import { about, site } from "@/content";
import { stagger } from "@/lib/stagger";

export default function About() {
  return (
    <section id="about" className="scroll-mt-6 pt-section">
      <div className="frame grid-12 gap-y-12">
        <h2 data-reveal className="col-span-12 t-section">
          {about.title}
        </h2>

        <figure data-reveal className="col-span-12 [--i:1] sm:col-span-6 md:col-span-4">
          <div className="relative aspect-square w-full overflow-hidden bg-stone">
            <Image
              src={site.avatar}
              alt={site.name}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 30vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
          <figcaption className="mt-4 t-small text-soft">{about.location}</figcaption>
        </figure>

        <div className="col-span-12 md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-6">
          <div className="flex max-w-[62ch] flex-col gap-6">
            <p data-reveal className="[--i:1]">
              I’m a full-stack software engineer with five years of experience shipping production
              systems for startups and small businesses across North America and Hong Kong. I work
              end-to-end — from designing PostgreSQL schemas and Spring Boot APIs to deploying React
              frontends on Kubernetes.
            </p>
            <p data-reveal className="[--i:2]">
              Lately I’ve been building <strong className="font-semibold">GoPlace</strong>, a
              multi-tenant booking platform for spas and wellness studios, alongside
              conversion-focused sites for{" "}
              <strong className="font-semibold">WP Legal &amp; Notary Public</strong> and{" "}
              <strong className="font-semibold">Help Me Clean</strong>. I care about measurable
              outcomes: faster page loads, higher form conversion, fewer on-call pages.
            </p>
            <p data-reveal className="[--i:3]">
              Outside of work, I write Go for fun, lift heavy things, and explore Toronto’s coffee
              scene.
            </p>
          </div>

          <dl className="mt-14 grid grid-cols-1 gap-x-[var(--gap)] gap-y-8 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
            {about.facts.map((fact, i) => (
              <div key={fact.label} data-reveal className="flex flex-col-reverse gap-1" style={stagger(i + 2)}>
                <dt className="t-small text-soft">{fact.label}</dt>
                <dd className="t-statement font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
