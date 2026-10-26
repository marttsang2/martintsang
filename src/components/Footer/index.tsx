import { footer, nav, site } from "@/content";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-honey pb-6 pt-[clamp(104px,10vw,160px)]">
      <div className="frame">
        <nav aria-label="Footer" className="flex justify-between t-small font-medium sm:justify-start sm:gap-8">
          {nav.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="link">
              {link.label}
            </a>
          ))}
        </nav>
        <div data-progress="enter" className="mt-[clamp(32px,4vw,56px)]">
          <p aria-hidden className="wordmark-scale whitespace-nowrap t-display">
            Martin <br className="sm:hidden" />
            Tsang
          </p>
        </div>
        <div className="mt-[clamp(32px,4vw,56px)] flex flex-col gap-1 t-small sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {footer.credit}
          </p>
          <p>{footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
