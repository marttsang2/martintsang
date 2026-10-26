import type { ReactNode } from "react";

type Props = { href: string; children: ReactNode; className?: string };

export default function TextLink({ href, children, className = "" }: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={`link ${className}`}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <span className="link-line">{children}</span>
      {external && (
        <>
          {" "}
          <span className="arrow" aria-hidden>
            ↗
          </span>
        </>
      )}
    </a>
  );
}
