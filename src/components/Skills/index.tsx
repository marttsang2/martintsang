import { skills, stackIntro } from "@/content";
import { stagger } from "@/lib/stagger";
import Words from "@/components/Words";

export default function Skills() {
  return (
    <section id="skills" data-chapter="paper" className="scroll-mt-6 py-section">
      <div className="frame grid-12 gap-y-12">
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <div className="md:sticky md:top-[calc(var(--header-h)_+_48px)]">
            <h2 data-lines className="t-section">
              <Words text={stackIntro.title} />
            </h2>
            <p data-reveal className="mt-6 max-w-[34ch] [--i:1]">
              {stackIntro.description}
            </p>
          </div>
        </div>

        <dl className="col-span-12 flex flex-col gap-10 md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6 md:gap-14">
          {skills.map((group, i) => (
            <div key={group.label} data-reveal className="t-statement" style={stagger(i % 2)}>
              <dt className="inline text-soft">{group.label}</dt>{" "}
              <dd className="inline">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
