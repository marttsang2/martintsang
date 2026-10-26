import { careerIntro, roles } from "@/content";

export default function Experiences() {
  return (
    <section id="experiences" className="mt-section scroll-mt-0 bg-stone py-section">
      <div className="frame grid-12 items-end gap-y-6">
        <h2 data-reveal className="col-span-12 t-section md:col-span-7">
          {careerIntro.title}
        </h2>
        <p data-reveal className="col-span-12 max-w-[44ch] [--i:1] md:col-span-5 md:col-start-8">
          {careerIntro.description}
        </p>
      </div>

      <div className="frame relative mt-[clamp(64px,8vw,112px)] [--route:6.5px] lg:[--route:calc((var(--frame)-11*var(--gap))/12*3+3*var(--gap))]">
        <div
          aria-hidden
          data-progress="line"
          className="absolute bottom-3 left-[calc(var(--route)-1.5px)] top-3 w-[3px] bg-[color-mix(in_srgb,var(--ink)_12%,transparent)]"
        >
          <div className="route-line h-full w-full bg-ink" />
        </div>

        <ol className="flex flex-col gap-[clamp(56px,6vw,96px)]">
          {roles.map((role) => (
            <li key={role.company} className="grid-12 relative gap-y-4">
              <span
                aria-hidden
                data-stop
                className="route-stop absolute left-[calc(var(--route)-6.5px)] top-[0.55em] h-[13px] w-[13px] rounded-full border-[3px] border-ink bg-stone"
              />
              <div data-reveal className="col-span-12 pl-8 lg:col-span-3 lg:pl-0">
                <p className="font-medium tabular-nums">{role.duration}</p>
                <p className="t-small text-soft">{role.location}</p>
              </div>
              <h3 data-reveal className="col-span-12 pl-8 t-statement font-medium [--i:1] lg:col-span-4 lg:pl-10">
                {role.position}
                <span className="block text-soft">{role.company}</span>
              </h3>
              <div data-reveal className="col-span-12 max-w-[68ch] pl-8 [--i:2] lg:col-span-5 lg:col-start-8 lg:pl-0">
                <ul className="flex list-disc flex-col gap-3 pl-5 marker:text-soft">
                  {role.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-5 t-small text-soft">{role.technologies.join(" · ")}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
