import { nav, site } from "@/content";

export default function Navbar() {
  return (
    <header className="bg-ink text-on-ink">
      <nav
        aria-label="Primary"
        className="frame flex flex-wrap items-center justify-between gap-y-3 pt-5 sm:pt-7"
      >
        <a href="#top" className="text-[22px] font-semibold tracking-[-0.04em]" aria-label={`${site.name}, home`}>
          MT<span className="text-honey">.</span>
        </a>
        <ul className="flex w-full justify-between t-small sm:w-auto sm:justify-start sm:gap-8">
          {nav.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="text-on-ink transition-colors hover:text-honey"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
