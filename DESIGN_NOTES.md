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
- **Header.** A plain bar that sticks to the top and takes the colour of the section under it: ink, paper, stone or honey. The change is a hard cut, timed to the moment a new section reaches the bar's lower edge, so the bar reads as part of that section. On phones only the row of links sticks; the "MT." row scrolls away.
- **No ornaments.** No gradients, shadows, hairlines, outlined boxes, eyebrows, pills, icons or monospace. Surfaces differ by tone only. Pictures have square corners. Buttons are fully round, and there is only one of them.

## Sections

1. **Hero (ink).** The statement and availability sit on the left. The intro, the "Get in touch" button and the GitHub and LinkedIn links sit on the right. Below them, the name runs the full width of the frame. On phones and tablets the name comes first.
2. **About (paper).** The avatar takes four columns. The three paragraphs, set as a letter, and the three figures take the right.
3. **Recent projects (paper).** Each project gets its name at heading size, its role and year, and its real screenshot under a plain bar that shows the domain. The four projects use three compositions in the order wide, left, wide, right, from a small layout table in `Projects`, so neighbours never mirror each other.
4. **Career (stone).** Each row shows dates and place, then role and company, then what was done and with what. The route line runs between the dates and the roles. Below 1024px it moves to the left edge and the rows stack.
5. **Tech stack (paper).** The heading stays pinned on the left while five run-in groups scroll on the right. Each group is set at statement size, with its label in soft ink.
6. **Contact and footer (honey).** The heading, one statement, the email at heading size, the two links and the line "Based in Toronto, on Eastern Time." Then the footer navigation, the full-width wordmark, and the original footer line.

## Motion

The motion pass on October 26, 2026 follows the skill's `references/motion.md`. Everything moves by `transform` or `opacity` (including the individual `translate` and `scale` properties). Hover colour changes were rebuilt as layers that fade, so no colour or layout property animates anywhere. All of it lives in `globals.css` and one client component, `Motion`.

**Rules the code keeps.**

- Hover and pointer motion runs only under `(hover: hover) and (pointer: fine)`. Touch screens get press feedback and nothing else.
- Every hidden or travelling start state sits inside `prefers-reduced-motion: no-preference`. Under reduced motion the page is the finished page: fades stay, travel, scale and pointer motion go.
- Nothing is hidden without JavaScript. `Motion` adds `.reveal-ready` after hydration and hides only what is still below the fold. The hero's load sequence is CSS, so it plays and ends visible with JavaScript off.
- No layout shift. Every figure, mask and line is in the server HTML; scripts only set classes and custom properties.
- Scroll work reads no layout. Positions are measured on resize, from layout offsets, and each animation frame reads only `scrollY`. Writes are skipped when a value has not changed.

**What moves.**

- **Load (signature move).** The statement, intro and button rise as before. Then "Martin" and "Tsang" rise out of their own masks, one after the other. All of it settles by about 1.2 s.
- **The name bookends the page.** As the first screen leaves, the name shrinks to 94% toward its baseline. The footer wordmark still grows from 94% to 100% as it arrives. With a mouse, the name also drifts up to 14 px against the pointer, which reads as depth.
- **Headings rise line by line.** Each section and project heading is split into word masks on the server. `Motion` numbers the lines after the words wrap, and the lines rise 90 ms apart.
- **Pictures open.** The avatar and the four screenshots open top-first, the edge that scrolls in first, while the picture settles from 112% scale. Screenshots still drift up to 3% of their height with the scroll. Paragraphs and lists keep the plain rise and fade, row by row.
- **About figures roll.** The digits of "5+ yrs" and "15+ projects" roll up from 0 to their value once, 70 ms apart. The real figure stays in the text, and CSS draws the rolling strip over it, so screen readers, search and copy-paste see the exact values.
- **Project screenshots answer the mouse.** Each screenshot is now a link to the project (out of the tab order; the text link below stays the keyboard route). On hover the picture zooms to 104% and pans up to 14 px against the pointer inside its frame, and an arrow appears in the domain bar.
- **Links draw their underline.** The resting line hands over to a full-strength line drawn from the left (honey on ink). Pressing a link dims it.
- **The button.** "Get in touch" leans up to 6 px toward the pointer, darkens through a fading layer, and presses to 97%.
- **Header.** An indicator under the active section's link slides between links as sections change. Its fill shows how far through that section the reader is, which is the page's scroll progress indicator. The career route and its stops draw as before.

**Left out, and why.**

- **Custom cursor.** Skipped. The skill bans it (it costs usability and hides the system cursor), and nothing on this page needs a pointer label.
- **3D tilt on project cards.** Skipped. It skews the screenshots' own text and reads as a template effect. The pan inside a still frame gives the depth without distorting the work.
- **Page-wide progress bar.** Skipped. A hairline across the top is a tell in the skill's registry; the nav indicator carries progress instead.
- **Marquees, sliders, scroll-jacking and smooth-scroll libraries.** Not used.

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

The motion pass ran these on the final production build (`next start`):

- `npm run build`, `npm run lint` and `npx tsc --noEmit` pass.
- `node scripts/check-layout.mjs <url> <outDir>` at 360, 390, 768, 1024, 1280, 1440 and 1920 px: all widths clean. The 1440 px page is 10175 px tall before and after.
- `node scripts/check-motion.mjs <url> <outDir>` passes all checks:
  - layout shift over load, a full scroll and hovers: CLS 0
  - only `transform`, `translate`, `scale` and `opacity` animate (run against the live site before the pass, it fails on the old `background-color` and `text-decoration-color` transitions)
  - the About figures keep their exact text, and every rolling digit rests on its real value
  - a nav click gives the header the Career ground and puts the indicator under Career
  - touch: no pointer-led motion and no hover line left drawn after a tap
  - reduced motion and JavaScript off: the first screen is readable at once, every block is in its finished state, and every picture loads
- `node scripts/record-motion.mjs <url> <outDir>` records frame sequences, MP4 and GIF for the load sequence, hero pointer, CTA hover, project card hover, nav indicator, scroll reveals, About counters and a phone scroll.
- The skill inspector reports 0 FAIL and 3 WARN. `no-real-pictures` and `no-footage` are unchanged from the revamp. `ragged-edges` is new and comes from the word masks: the meter counts each heading word as a text block (27 blocks became 41), while the real text edges are unchanged. The skill's source lint reports 0 FAIL and 0 WARN.
- Lighthouse 12, median of 3 runs on the final build: mobile performance 99 (before the pass: 98), desktop 100 (before: 100). Accessibility, best practices and SEO stay at 100, and CLS stays 0. In an interleaved A/B of 7 mobile runs per side, the performance median was 99 on both. Mobile LCP moved from 1961 ms to 2109 ms (A/B medians), mostly because the measured element changed: the hero text used to start at opacity 0, so Lighthouse scored a nav link; the name's words now count.

## Final critique (motion pass, round 2)

```
ROUND 2
Seen in one second: the name rising out of its mask on the ink field, then holding still above the S-curve.
Idea (one sentence): the route from Hong Kong to Toronto draws itself down the Career list; the name bookends the page, receding as you leave the top and growing as you reach the foot.
Live thing: none (clock removed).
Layout words by section: hero=poster / about=split / work=big names over screenshots / career=route list / stack=sticky split + run-in list / contact=statement field / footer=wordmark
Scores: design 8 · usability 8.5 · creativity 7 · content 8 → overall 7.9
Caps applied: no live thing → creativity ≤ 7.5 (not binding)
Top three problems still visible:
1. Rolling digits pass through neighbouring digits while they roll; they settle within about a second.
2. The inspector's ragged-edges warning is a measuring artifact of the word masks, kept on purpose.
3. Creativity stays at 7: the motion is careful polish of known moves, and there is no live thing now.
```

Round 1 found and fixed three problems: picture covers opened bottom-first, so the edge that scrolls in first stayed blank for about a second; the hero's word masks reached far below the baseline, so the name rose out of the S-curve; and the new header row was 2 px shorter than the old one, which moved the hero up and lifted the underline 3 px above its old position.
