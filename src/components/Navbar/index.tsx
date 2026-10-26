import { nav, site } from "@/content";

export default function Navbar() {
  return (
    <header data-header data-ground="ink" className="site-header">
      <nav
        aria-label="Primary"
        className="frame flex flex-wrap items-center justify-between gap-y-3 pb-3 pt-5 sm:pb-4 sm:pt-7"
      >
        <a href="#top" className="text-[22px] font-semibold leading-[34px] tracking-[-0.04em]" aria-label={`${site.name}, home`}>
          MT<span className="brand-dot text-honey">.</span>
        </a>
        <div className="relative w-full t-small sm:w-auto">
          <ul className="flex justify-between sm:justify-start sm:gap-8">
            {nav.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} data-nav-link className="link link-quiet">
                  <span className="link-line">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <span aria-hidden data-nav-indicator className="nav-indicator">
            <span />
          </span>
        </div>
      </nav>
    </header>
  );
}
