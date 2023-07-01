type SectionProps = {
    title: string
    children: React.ReactNode
}

const Section = ({ title, children }: SectionProps) => {
    return (
        <>
            <p className="text-medium font-medium my-2 uppercase text-slate-200">
                {title}
            </p>
            <li className="flex flex-col group/list">
                {children}
            </li>
        </>
    )
}

export default Section