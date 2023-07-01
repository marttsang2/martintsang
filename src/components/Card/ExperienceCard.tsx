type ExperienceCardProps = {
    title: string,
    company: string,
    startDate: string,
    endDate: string,
    skills?: string[],
    description: string,
    url: string,
}

const ExperienceCard = ({ title, company, startDate, endDate, description, skills, url }: ExperienceCardProps) => (
    <div className="group relative transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50 border-[1px] rounded-lg border-transparent hover:border-sky-400/40">
        <a className="m-3 grid pb-1 sm:grid-cols-12 sm:gap-8 lg:gap-0" href={url}>
            <header className="mt-1 lg:col-span-4 sm:col-span-12 text-xs uppercase tracking-wide text-slate-500">{startDate} — {endDate}</header>
            <div className="flex flex-col col-span-8">
                <p className="text-medium font-medium text-slate-200">{title} · {company}</p>
                <p className="text-sm text-slate-500">{description}</p>
            </div>
            <ul className="col-span-12 flex flex-wrap">
                {skills?.map((skill) => (
                    <li key={skill} className="mr-2 mt-1 px-3 py-1 item-center inline-block whitespace-nowrap text-xs font-medium text-sky-400 bg-sky-400/10 rounded-full">{skill}</li>
                ))}
            </ul>
        </a>
    </div>
)

export default ExperienceCard;