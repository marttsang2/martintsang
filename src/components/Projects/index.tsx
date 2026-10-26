import Image from "next/image";
import { projects, projectsIntro, type Project } from "@/content";
import { stagger } from "@/lib/stagger";
import TextLink from "@/components/TextLink";
import Words from "@/components/Words";

type Layout = "wide" | "left" | "right";

// One composition per project, in page order, so neighbouring projects never mirror each other.
const layouts: Layout[] = ["wide", "left", "wide", "right"];

const placement: Record<Layout, { figure: string; aside: string; ratio: string; sizes: string }> = {
  wide: {
    figure: "col-span-12",
    aside: "col-span-12 md:grid md:grid-cols-subgrid",
    ratio: "aspect-[16/10] md:aspect-[16/8]",
    sizes: "(min-width: 1660px) 1600px, 94vw",
  },
  left: {
    figure: "col-span-12 lg:col-span-8",
    aside: "col-span-12 lg:col-span-4 lg:col-start-9",
    ratio: "aspect-[16/10]",
    sizes: "(min-width: 1024px) 62vw, 94vw",
  },
  right: {
    figure: "col-span-12 lg:col-span-8 lg:col-start-5 lg:row-start-2",
    aside: "col-span-12 lg:col-span-4 lg:col-start-1 lg:row-start-2",
    ratio: "aspect-[16/10]",
    sizes: "(min-width: 1024px) 62vw, 94vw",
  },
};

function Screenshot({ project, layout }: { project: Project; layout: Layout }) {
  const { figure, ratio, sizes } = placement[layout];
  return (
    <figure data-reveal className={`${figure} [--i:1]`} data-ui>
      <a href={project.link} target="_blank" rel="noopener noreferrer" tabIndex={-1} data-shot className="shot block">
        <span className="flex h-10 items-center gap-2 bg-ink px-4 t-small text-on-ink-soft">
          {project.linkLabel}
          <span aria-hidden className="shot-arrow">
            ↗
          </span>
        </span>
        <span className={`relative block overflow-hidden bg-stone ${ratio}`} data-progress="through">
          <span className="drift absolute inset-0">
            <Image
              src={project.image}
              alt={`${project.title} website, ${project.linkLabel}`}
              fill
              className="shot-img object-cover object-top"
              sizes={sizes}
            />
          </span>
          <span aria-hidden className="cover" />
        </span>
      </a>
    </figure>
  );
}

function Details({ project, layout }: { project: Project; layout: Layout }) {
  const wide = layout === "wide";
  return (
    <div className={`${placement[layout].aside} flex flex-col gap-y-8`}>
      <div data-reveal className={`flex flex-col gap-6 [--i:2] ${wide ? "md:col-span-5" : ""}`}>
        <p>{project.description}</p>
        <TextLink href={project.link} className="w-fit font-medium">
          {project.linkLabel}
        </TextLink>
      </div>
      <div data-reveal className={`flex flex-col gap-6 [--i:3] ${wide ? "md:col-span-6 md:col-start-7" : ""}`}>
        <ul className="flex list-disc flex-col gap-3 pl-5 t-small marker:text-soft">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <p className="t-small text-soft">{project.technologies.join(" · ")}</p>
      </div>
    </div>
  );
}

// One row per project, linking down to it. A honey fill wipes in on hover and the other rows dim.
function Index() {
  return (
    <ol aria-label="Projects" className="fill-list isolate mt-[clamp(48px,6vw,96px)] [--fill:var(--honey)]">
      {projects.map((project, i) => (
        <li key={project.id} data-reveal className="fill-row" style={stagger(i)}>
          <a href={`#${project.id}`} className="fill-dim grid-12 items-baseline gap-y-1 py-[clamp(14px,1.5vw,24px)]">
            <span className="fill-shift col-span-11 t-statement font-medium md:col-span-7">{project.title}</span>
            <span className="col-span-12 row-start-2 whitespace-nowrap t-small text-soft md:col-span-4 md:col-start-8 md:row-start-1 lg:text-[length:var(--t-body)]">
              <span className="font-medium text-ink">{project.role}</span> · {project.year}
            </span>
            <span aria-hidden className="row-arrow col-span-1 col-start-12 row-start-1 justify-self-end pr-[var(--row-pad)]">
              ↓
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function Projects() {
  return (
    <section id="projects" data-chapter="paper" className="scroll-mt-6 pt-section">
      <div className="frame grid-12 items-end gap-y-6">
        <h2 data-lines className="col-span-12 t-section md:col-span-7">
          <Words text={projectsIntro.title} />
        </h2>
        <p data-reveal className="col-span-12 max-w-[44ch] [--i:1] md:col-span-5 md:col-start-8">
          {projectsIntro.description}
        </p>
      </div>
      <div className="frame">
        <Index />
      </div>

      <div className="frame mt-[clamp(96px,11vw,176px)] flex flex-col gap-[clamp(96px,11vw,176px)]">
        {projects.map((project, i) => {
          const layout = layouts[i % layouts.length];
          return (
            <article key={project.id} id={project.id} className="grid-12 scroll-mt-[calc(var(--header-h)+24px)] gap-y-8 md:gap-y-10">
              <header className="col-span-12 grid grid-cols-subgrid items-end gap-y-3">
                <h3 data-lines className="col-span-12 t-section lg:col-span-9">
                  <Words text={project.title} />
                </h3>
                <p data-reveal className="col-span-12 t-small text-soft [--i:1] lg:col-span-3 lg:text-right">
                  <span className="font-medium text-ink">{project.role}</span>
                  <br />
                  {project.year}
                </p>
              </header>
              <Screenshot project={project} layout={layout} />
              <Details project={project} layout={layout} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
