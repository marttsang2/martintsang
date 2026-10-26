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
- **Live thing.** The contact section shows the current time in Toronto ("It's 2:18 a.m. in Toronto right now."), so a visitor in another time zone knows when to expect a reply. Without JavaScript it reads "Based in Toronto, on Eastern Time."

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
- **No ornaments.** No gradients, shadows, hairlines, outlined boxes, eyebrows, pills, icons or monospace. Surfaces differ by tone only. Pictures have square corners. Buttons are fully round, and there is only one of them.

## Sections

1. **Hero (ink).** The statement and availability sit on the left. The intro, the "Get in touch" button and the GitHub and LinkedIn links sit on the right. Below them, the name runs the full width of the frame. On phones and tablets the name comes first.
2. **About (paper).** The avatar takes four columns. The three paragraphs, set as a letter, and the three figures take the right.
3. **Recent projects (paper).** Each project gets its name at heading size, its role and year, and its real screenshot under a plain bar that shows the domain. The four projects use three compositions in the order wide, left, wide, right, from a small layout table in `Projects`, so neighbours never mirror each other.
4. **Career (stone).** Each row shows dates and place, then role and company, then what was done and with what. The route line runs between the dates and the roles. Below 1024px it moves to the left edge and the rows stack.
5. **Tech stack (paper).** The heading stays pinned on the left while five run-in groups scroll on the right. Each group is set at statement size, with its label in soft ink.
6. **Contact and footer (honey).** The heading, one statement, the email at heading size, the two links and the Toronto clock. Then the footer navigation, the full-width wordmark, and the original footer line.

## Motion

Motion uses transform and opacity only. All of it is in `globals.css` and one client component, `Motion`.

- The hero rises in with CSS on load, so it never waits for JavaScript.
- Elements marked `data-reveal` rise 28px and fade in once, staggered 80ms, as they enter the viewport. The page renders visible: `Motion` hides only elements still below the fold, and only after hydration. Without JavaScript nothing is hidden.
- **Scroll-drawn line.** The career route is drawn by `scaleY` up to a point three quarters down the viewport. Each stop fills with honey as the line reaches it.
- Project screenshots drift by up to 3% of their height inside their frames.
- The footer wordmark grows from 94% to 100% as it arrives.
- Links and the button respond on hover and press. Focus rings use the current text colour, so they show on ink, paper and honey.
- Under `prefers-reduced-motion`, the page keeps the fades and drops all travel, scaling and drift. The route line is drawn in full.

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

- `npm run build`, `npm run lint` and `npx tsc --noEmit` all pass.
- `node scripts/check-layout.mjs <url> [outDir]` screenshots 360, 390, 768, 1024, 1280, 1440 and 1920px into `outDir` (default `.shots/`; this run used `/workspace/martintsang-shots/preview/`). It fails on sideways scroll, text off screen, or overlapping text lines. Result: all widths clean.
- The skill inspector at 1440, 768 and 390 reports 0 FAIL and 2 WARN. Before the revamp it reported 13 FAIL and 7 WARN. The two warnings remain on purpose:
  - `no-real-pictures`: the pictures are the real project screenshots, which is the honest picture for this subject.
  - `no-footage`: no honest clip of this subject exists.
- The skill's source lint reports 0 FAIL and 0 WARN.
- A puppeteer pass checked the motion states:
  - all reveals fire after a full scroll
  - the route line and its stops track the scroll
  - the wordmark reaches full size
  - reduced motion removes travel
  - with JavaScript off, every element is visible

## Final critique (round 3)

```
ROUND 3
Seen in one second: the name, huge, on the ink field above the S-curve.
Idea (one sentence): the route from Hong Kong to Toronto draws itself down the Career list; the name bookends the page.
Live thing: Toronto local time beside the email.
Layout words by section: hero=poster / about=split / work=big names over screenshots / career=route list / stack=sticky split + run-in list / contact=statement field / footer=wordmark
Scores: design 8 · usability 8.5 · creativity 7 · content 8 → overall 7.9
Caps applied: none
Top three problems still visible:
1. The Jomud screenshot shows Jomud's own figures band at the foot of its frame. It is the curated original; the live site has changed.
2. No footage, and only one photograph (the avatar). The project screenshots carry the page.
3. Creativity stops at 7: the route line and the bookended name are tasteful rather than new.
```
