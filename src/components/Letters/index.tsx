import { Fragment, type CSSProperties } from "react";

type Props = { text: string; from?: number; kerning?: Record<string, number> };

// One box per letter, numbered from `from` so one stagger can run across several words. Spaces stay text, so words space and wrap as before.
// Separate boxes lose the font's kerning; `kerning` gives a pair's kern back (in em) as the second letter's margin.
export default function Letters({ text, from = 0, kerning = {} }: Props) {
  const chars = [...text];
  return chars.map((char, i) => {
    if (char === " ") return <Fragment key={i}> </Fragment>;
    const kern = kerning[`${chars[i - 1]}${char}`];
    return (
      <span key={i} className="char" data-char={char} style={{ "--c": from + i, marginLeft: kern && `${kern}em` } as CSSProperties}>
        {char}
      </span>
    );
  });
}
