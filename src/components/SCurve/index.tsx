// The ink field ends in one S-shaped step: low on the left, rising to meet the paper on the right.
export default function SCurve() {
  return (
    <div aria-hidden className="flex h-[clamp(48px,7vw,112px)] w-full bg-paper">
      <div className="h-full flex-[0_0_34%] bg-ink" />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="-ml-px h-full w-[clamp(140px,22vw,380px)] shrink-0 fill-ink"
      >
        <path d="M0 0 L0 100 C50 100 50 0 100 0 Z" />
      </svg>
    </div>
  );
}
