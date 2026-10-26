# Design notes: October 2026 revamp

The site is still one Next.js page styled with Tailwind. Every word, URL and label comes from the previous version. Nothing was invented: no new figures, quotes, clients or logos. The three About figures (5+ yrs, 15+ projects, Full-stack) were already on the site.

## Direction

The page follows the design-taste-frontend skill's redesign protocol.

- **Before.** The inspector found 13 FAIL and 7 WARN on the old page. It had eyebrow labels with 01–05 numbering, monospace tags, gradients, hairlines and outlined cards. It also had 14px body text, a three-line headline, and ten type sizes at 768px.
- **Draw.** Sector `personal-portfolio` with `--keep palette,type`. The skill offered three directions, and **The split stage** was chosen (seed 1675380626). Its rule is "half the screen never moves", which suits a page that is mostly reading. That idea lives in the Stack section, where the heading stays pinned while the list scrolls. The dealt hero's other move also stays: the name runs along the foot of the first screen.
- **Redraws, with reasons.**
  - The **hero** photograph was dropped. The dealt hero needs a tall portrait, and none exists. The only portrait is the cartoon avatar.
  - The **work** section ("title torn at the seam") was replaced. Pinned, split panes that travel apart on scroll are the kind of gimmick the brief rules out, and the brief allows light motion only.
  - The scalloped price-list sheet planned for **Stack** and the single-field **contact** were dropped. Both are novelty objects, and there is no form backend.
  - The **footer** ("a single quiet line") was replaced. The brief asks for a large-wordmark footer.
- **Idea.** Martin's route from Hong Kong to Toronto becomes the line that draws itself down the Career list, and his name bookends the page: paper on ink at the top, ink on honey at the foot.
- **Live thing.** The first build showed the current time in Toronto beside the email. The motion pass removed it (see "The Toronto clock" under Motion). The contact section now says "Based in Toronto, on Eastern Time." as plain text.

## System

- **Grid.** One 12-column grid inside one frame, `min(100vw − 2 × margin, 1600px)` with margins of `clamp(20px, 3.2vw, 48px)`. The nav, every section and the footer share it, so the left and right margins match at every width.
- **Type.** Geist only, the face the site already used, in five steps:
  - display: the name, sized from the frame so it spans the width
  - section heading: 44–112px
  - statement: 24–36px
  - body: 17–19px
  - small: 15px

  Display type is set tight (−0.055em tracking, 0.86 leading). Running text is full ink at 17px or more.
- **Colour.** The old site's identity was near-black with a yellow accent, and that is kept: the first screen is ink `#0c0c0b`. The rest of the page sits on a neutral paper `#f4f4f0`, with stone `#e8e7e1` as the one tone step (Career). The yellow is koolabee's honey `#FFD43B`. It replaces Tailwind's stock `yellow-300` because it holds better on paper. It appears on the action, the availability dot, the reached stops of the career route, and the closing field.
- **Dark section with an S-curve edge.** The hero is the one dark section. It ends in a single S-shaped step (`SCurve`): ink stays low on the left, then rises to meet the paper. The step is built from a flat block plus a fixed-shape SVG curve, so it keeps its shape at every width instead of being stretched.
- **Header.** A plain bar that sticks to the top and takes the colour of the section under it: ink, paper, stone or honey. The change is a hard cut, timed to the moment a new section reaches the bar's lower edge, so the bar reads as part of that section. On phones only the row of links sticks; the "MT." row scrolls away. The bar slides out of view while the reader scrolls down and comes back on any scroll up.
- **No ornaments.** No gradients, shadows, hairlines, outlined boxes, eyebrows, pills, icons or monospace. Surfaces differ by tone only. Pictures have square corners. Buttons are fully round, and there is only one of them.

## Sections

1. **Hero (ink).** The statement and availability sit on the left. The intro, the "Get in touch" button and the GitHub and LinkedIn links sit on the right. Below them, the name runs the full width of the frame. On phones and tablets the name comes first.
2. **About (paper).** The avatar takes four columns. The three paragraphs, set as a letter, and the three figures take the right.
3. **Recent projects (paper).** An index of the four projects opens the section: one row each, with the name at statement size and the role and year on the description's column. Each row links down to its project. Each project then gets its name at heading size, its role and year, and its real screenshot under a plain bar that shows the domain. The four projects use three compositions in the order wide, left, wide, right, from a small layout table in `Projects`, so neighbours never mirror each other. The index uses only the projects' own names, roles and years.
4. **Career (stone).** Each row shows dates and place, then role and company, then what was done and with what. The route line runs between the dates and the roles. Below 1024px it moves to the left edge and the rows stack.
5. **Tech stack (paper).** The heading stays pinned on the left while five run-in groups scroll on the right. Each group is set at statement size, with its label in soft ink.
6. **Contact and footer (honey).** The heading, one statement, the email at heading size, the two links and the line "Based in Toronto, on Eastern Time." Then the footer navigation, the full-width wordmark, and the original footer line.

## Motion

Two passes. The first (October 26, 2026) followed the skill's `references/motion.md`. The second, the same day, applies the KittenJam motion library's styles, which Martin approved: its curves, durations and staggers, and five of its patterns adapted to this page. The study of the library is in `/workspace/kittenjam-study/STYLE_GUIDE.md`; its "maps onto martintsang" section chose the patterns. Everything moves by `transform` or `opacity` (including the individual `translate` and `scale` properties). Hover colour changes are layers that fade, so no colour or layout property animates anywhere. All of it lives in `globals.css`, one client component (`Motion`) and one server component that splits text into letters (`Letters`).

**Tokens.** Every transition and animation uses the KittenJam tokens on `:root`, and `scripts/check-motion.mjs` fails on any curve or duration outside them.

| Token | Value | Used for |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(.2,.8,.2,1)` | entrances, fades, the header, the nav indicator |
| `--ease-io` | `cubic-bezier(.7,0,.2,1)` | wipes: the rolling label, row fills, underlines, picture covers |
| `--ease-gentle` | `cubic-bezier(.2,.7,.2,1)` | pictures settling and zooming inside their frames |
| `--d-press` | `.14s` | press feedback |
| `--d-fast`, `--d-hover`, `--d-slow` | `.35s`, `.45s`, `.6s` | hovers and small moves |
| `--d-reveal`, `--d-open` | `1s`, `1.2s` | entrances; picture openings |
| `--stagger`, `--stagger-char` | `.08s`, `.035s` | between lines, blocks and rows; between letters |

**Rules the code keeps.**

- Hover and pointer motion runs only under `(hover: hover) and (pointer: fine)`. Touch screens get press feedback and nothing else.
- Every hidden or travelling start state sits inside `prefers-reduced-motion: no-preference`. Under reduced motion the page is the finished page: fades stay, travel, scale and pointer motion go. The header stays in view, row fills fade in place, and the button label does not roll.
- Nothing is hidden without JavaScript. `Motion` adds `.reveal-ready` after hydration and hides only what is still below the fold. The hero's load sequence is CSS, so it plays and ends visible with JavaScript off. The rolling label, the row fills and the underlines are CSS too; only the hiding header needs the script, and without it the header simply stays.
- No layout shift. Every figure, mask, letter and line is in the server HTML; scripts only set classes, attributes and custom properties.
- Scroll work reads no layout. Positions are measured on resize, from layout offsets, and each animation frame reads only `scrollY`. Writes are skipped when a value has not changed.

**What moves.**

- **Load (signature move).** The statement, intro and button rise 18 px and fade in, 80 ms apart. The name's letters rise out of their word masks one after another, 35 ms apart, over 1 s each; the last settles at about 1.4 s. Splitting the name into letter boxes loses Geist's kerning (about 0.065em in "Martin" and 0.094em in "Tsang", enough to push the name 40 px past the frame at 1440). So each letter takes its pair's kern back as a margin, and `check-motion` fails if a letter sits more than 0.5 px from where the unsplit text puts it. The h1 keeps the accessible name "Martin Tsang"; the letter boxes are hidden from assistive tech.
- **The name bookends the page.** As the first screen leaves, the name shrinks to 94% toward its baseline. The footer wordmark still grows from 94% to 100% as it arrives. With a mouse, the name also drifts up to 14 px against the pointer, which reads as depth.
- **The rolling button.** On hover or keyboard focus, each letter of "Get in touch" rolls up out of the label while its copy rolls in from below, 35 ms apart, over 0.6 s on `--ease-io`. The button darkens through a fading layer and presses to 97%. It leaves in the same order. The link's accessible name is "Get in touch"; the letters and their copies are hidden from assistive tech. The old lean toward the pointer was removed: three responses on one 52 px button read as busy, and the guide says to keep the roll to one element.
- **List rows fill.** The work index and the Career list share one pattern. On hover, a fill wipes in from the left over 0.6 s, the label steps in (16 px for a project name, 12 px for a role), and the other rows dim to 45%. Moving to the next row, the old fill leaves to the right while the new one wipes in from the left. Work rows fill with honey inside the frame, and an arrow slides in. Career rows fill with paper from edge to edge, the fill spans the gap between rows so the pointer never falls between two, and the route line stays on top of the fill. Keyboard focus on a work row fills it and dims the others in the same way. The fill sits on the row and the dim on its content, so a leaving fill keeps its full colour.
- **Headings rise line by line.** Each section and project heading is split into word masks on the server. `Motion` numbers the lines after the words wrap, and the lines rise 80 ms apart.
- **Pictures open.** The avatar and the four screenshots open top-first, the edge that scrolls in first, while the picture settles from 112% scale. Screenshots still drift up to 3% of their height with the scroll. Paragraphs, lists and the index rows keep the plain rise and fade, row by row.
- **About figures roll.** The digits of "5+ yrs" and "15+ projects" roll up from 0 to their value once, 80 ms apart. The real figure stays in the text, and CSS draws the rolling strip over it, so screen readers, search and copy-paste see the exact values.
- **Project screenshots answer the mouse.** Each screenshot is a link to the project (out of the tab order; the text link below stays the keyboard route). On hover the picture zooms to 104% and pans up to 14 px against the pointer inside its frame, and an arrow appears in the domain bar.
- **Underlines grow and leave.** Every text link keeps its resting line. On hover a full-strength line (honey on ink) grows over it from the left, and on hover-out it leaves to the right instead of shrinking back, over 0.45 s on `--ease-io`. Pressing a link dims it.
- **The header hides.** It slides up out of view after 16 px of scrolling down and slides back after 8 px of scrolling up, over 0.35 s. It always shows near the top of the page, while a link inside it has focus, and through the jump after any in-page link (nav, index row or footer). The indicator under the active section's link still slides between links as sections change, and its fill still shows how far through that section the reader is. The career route and its stops draw as before.

**Left out, and why.**

- **Marquees and sliders.** Rejected, as the brief asks. The guide lists every marquee, carousel and slider pattern in the library.
- **Custom cursors.** Rejected. Hover Expand Cursor and the trail and blend cursors hide the system cursor and cost usability.
- **Bouncy pops.** Rejected. The library's overshoot curves (`back.out`, `elastic`, `cubic-bezier(.3,1.4,.5,1)`) read as playful, not polished. The Sliding Nav Highlight's slight overshoot was also left out; the indicator uses `--ease-out`.
- **Canvas.** Rejected. The library's 14 canvas effects are ambient backgrounds, the stereotypical "AI-looking" layer.
- **Blur, clip-path wipes, spotlight cards and gradient masks.** Not adopted. They animate `filter`, `clip-path` or background position, not transform or opacity.
- **3D tilt on project cards and a page-wide progress bar.** Still skipped, for the reasons in the first pass.

**The Toronto clock.** Removed. It was added in the first build to meet the skill's "live thing" step, and it was not part of the design. Every Toronto developer could show the same clock, so it failed the skill's own competitor test. It also ran a timer for the life of the page and swapped its text after hydration. The useful fact stays as plain text: "Based in Toronto, on Eastern Time."

## SEO

- **Metadata.** Title, description, canonical URL, OpenGraph (`profile` type, 1200×630 image) and a Twitter large-image card.
- **JSON-LD.** A `Person` node and a `WebSite` node, built from `src/content.ts`. The `Person` node has name, URL, avatar, job title, Toronto address, email, GitHub, LinkedIn and `knowsAbout` from the stack list.
- **`public/og.png`.** Rendered by `scripts/og-image.mjs` with the hero's own type, colours and curve.
- **`public/llms.txt`.** The page's sections, the four projects and the contact details.
- **`robots.txt` and `sitemap.xml`.** Generated by `src/app/robots.ts` and `src/app/sitemap.ts`.
- **Site URL.** The URL is now `https://martintsang.vercel.app`, the repository's homepage. The previous `metadataBase` pointed at `martintsang.com`, which does not resolve, so every absolute URL in the share tags was broken.

## Pictures

There are five pictures, all the site's own:

- the avatar
- the four project screenshots in `public/projects/`

No stock, archival or generated images were added, and there is nothing to credit. The Jomud screenshot is the original square capture, cropped to 16:10 from the top. The live jomud.io has since been redesigned, so it was not recaptured.

## Code changes besides the design

- Motion pass: `TextLink` renders every text link with its two underlines, and `Words` splits a heading into word masks. `site.timeZone` and `TorontoTime` were deleted with the clock.
- KittenJam pass: `Letters` splits the name and the button label into letter boxes, with optional kerning per pair. Each project in `content.ts` has an `id`, which the index links to. `Motion` lost the magnet and gained `hidingHeader`. `record-motion.mjs` writes MP4 only (no GIFs), keeps each clip under 1.5 MB, deletes its frame folders unless `--keep-frames` is passed, and records five new scenarios; the old `hero-load`, `cta-hover` and `nav-indicator` scenarios were replaced by `name-reveal`, `cta-roll` and `header-hide`.
- All page copy and data moved into one typed module, `src/content.ts`. The components read from it, and so do the metadata and the JSON-LD.
- Unused code was removed: the shadcn files (`components/ui/*`, `lib/utils.ts`, `components.json`) and the dependencies only they or the old design used:
  - `framer-motion`
  - `lucide-react`
  - `@radix-ui/*`
  - `class-variance-authority`
  - `clsx`
  - `tailwind-merge`
  - `tailwindcss-animate`
  - `@eslint/eslintrc`
- `npm run lint` was broken on `main`. Next 16 removed `next lint`, and the FlatCompat config could not load `eslint-config-next` 16. The script now runs `eslint .` against the package's native flat config.
- `scripts/capture-projects.js` became an ES module, so lint passes. It now finds Chrome on `PATH` instead of a hard-coded Windows path.
- `package-lock.json` is unchanged. It was already out of date before this work (it pins Next 15.1.0). `pnpm-lock.yaml` is the lockfile kept in sync.

## Checks run on the final build

The KittenJam pass ran these on the final production build (`next start`):

- `npm run build`, `npm run lint` and `npx tsc --noEmit` pass.
- `node scripts/check-layout.mjs <url> <outDir>` at 360, 390, 768, 1024, 1280, 1440 and 1920 px: all widths clean.
- `node scripts/check-motion.mjs <url> <outDir>` passes all 43 checks. New in this pass:
  - every motion token is set on `:root`, and every transition and animation that runs uses a token curve and duration (seeded with a stray `300ms ease`, it names the element)
  - the name's letters rise in order, rest in place, and keep Geist's kerning within 0.5 px (seeded with a wrong kern, it prints the corrected table)
  - the CTA label rolls letter by letter, rests a full line up and rolls back; one accessible name
  - underlines grow from the left and leave to the right (seeded with the hover origin removed, it fails)
  - work and Career rows: the hovered row fills from the left and steps in, the others dim to 0.45, the leaving fill exits right, and keyboard focus does the same for work rows
  - the header hides on the way down, returns on the way up with the indicator, comes back for focus, and stays through a nav jump
  - touch: no roll, fill or dim; reduced motion: no roll, fills fade in place, header stays; reduced motion and JavaScript off: the first screen is readable at once and every block is finished
  - CLS 0 over load, a full scroll, every hover and the header
- `node scripts/record-motion.mjs <url> <outDir> --only name-reveal,cta-roll,underline,row-hover,header-hide` writes one H.264 MP4 per effect, each under 1.5 MB, and removes the frame folders. The close-ups (button, underline) are captured at 2x.
- The skill's source lint reports 0 FAIL and 0 WARN. The inspector reports 0 FAIL and 4 WARN:
  - `no-real-pictures` and `no-footage` are unchanged from the revamp
  - `ragged-edges` is the word-mask artifact from the first pass
  - `hero-void` is new and is also a measuring artifact. The inspector skips text nodes shorter than two characters (`scripts/lib/probe.mjs`), so it cannot see the name once each letter is its own node, and it reports the name's 1440×300 block as empty. The screenshots show the name there.
- Lighthouse 12.8, production build. On the final build, mobile performance is 99 in 3 of 3 runs and desktop 100 in 3 of 3. An earlier build of this pass scored 98, 99 and 97 on mobile, so an interleaved A/B against `main` followed, 7 runs per side: median 99 on both (branch 97 to 99, `main` 98 to 99). LCP medians are 2110 and 2108 ms, and TBT medians are 36 and 40 ms. The observed LCP is the first paint (about 150 ms) on both. The simulated 2.1 s comes from Lighthouse counting the Next.js scripts that start loading before first paint, so it does not move with this work. Accessibility, best practices and SEO stay at 100, and CLS stays 0.

## Final critique (KittenJam pass)

```
ROUND 1
Seen in one second: the name rising letter by letter out of its mask on the ink field.
Top three problems:
1. The work index put role and year on column 7, one column left of the intro paragraph above, which added a stray text edge; at 768 the year wrapped in its two-column slot.
2. The row-hover clip spent four seconds scrolling through the projects between the two lists.
3. The close-up crops caught a descender from the line above and the button's edge.
Fixed: role and year now share one cell on the description's column from 768 up; the clip cuts straight to Career; the crops are tighter.

ROUND 2
Seen in one second: the name rising letter by letter, then holding still above the S-curve.
Idea (one sentence): the route from Hong Kong to Toronto draws itself down the Career list; the name bookends the page, receding as you leave the top and growing as you reach the foot.
Live thing: none (clock removed).
Layout words by section: hero=poster / about=split / work=index rows, then big names over screenshots / career=route list with full-bleed row fills / stack=sticky split + run-in list / contact=statement field / footer=wordmark
Scores: design 8 · usability 8.5 · creativity 7.5 · content 8 → overall 8.0
Caps applied: no live thing → creativity ≤ 7.5 (binding)
Top three problems still visible:
1. Keyboard focus filled a work row but did not dim the others (fixed in this round; check-motion now covers it).
2. --ease-io starts slowly, so the label roll shows little movement in its first 150 ms; kept, because it is the library's own curve for this pattern.
3. The inspector's hero-void warning is a measuring artifact of the letter split, kept on purpose.
```
