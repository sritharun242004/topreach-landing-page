# Top Reach Pro design system

## Direction

A warm, bold campaign for students facing an open career decision. The visual world uses a cream field for reading, near-black for authority and video framing, and sunset orange for energy and action. It borrows Claude's warm editorial restraint as inspiration, not an official Anthropic component system.

## Color tokens

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Paper | `--paper` | `#f4f0e7` | Main background and light text on black |
| Secondary paper | `--paper-2` | `#ebe5d9` | Registration zone and subtle depth |
| Ink | `--ink` | `#151515` | Main text, video section, primary buttons |
| Muted ink | `--muted` | `#5e5a54` | Supporting copy |
| Line | `--line` | `#c9c1b3` | Dividers and form controls |
| Sunset orange | `--orange` | `#e76a35` | Major branded surfaces |
| Deep orange | `--orange-deep` | `#d75625` | Emphasis on cream |
| Warm white | `--white` | `#fffaf2` | Highlight on orange |

## Typography

The self-hosted Figtree variable font is the sole interface and display family. Headlines use weight 800–900, tight tracking, and short lines. Body text uses a comfortable line height and dark warm-neutral ink. Small utility labels use weight 800 and measured letter spacing.

## Components

- Buttons are soft rounded rectangles, high-contrast, and have a clear action label plus a directional arrow.
- The media section sits on solid black; each video has native controls and a static poster.
- The six program stages are a ruled list, so they read as one progression.
- The form uses visible labels, native input semantics, consent, loading and error states.
- The admin table uses the same paper and ink tokens with horizontal scrolling on narrow screens.

## Corner geometry

The page uses one deliberate soft-edge scale. Keep large full-width color bands visually calm; round the contained surfaces and the bands' exposed outer corners without turning each section into a card.

| Role | Token | Radius | Applied to |
| --- | --- | --- | --- |
| Control | `--radius-control` | `12px` | Buttons, navigation action, text inputs |
| Panel | `--radius-panel` | `18px` | Video frames, form panel, admin table shell |
| Feature | `--radius-feature` | `24px` | Hero artwork, major full-width color bands |
| Circle | `--radius-circle` | `50%` | Eagle logo and intentional circular artwork |

The header eagle is displayed inside a black circle with enough inset to keep its wings visible. The favicon uses the same circular treatment with transparent corners. The existing black circular headline artwork remains a circle. Thin list dividers stay straight because they show a progression, not a card grid.

## Copy hierarchy

The hero leads with the existing future-facing promise. “Watch before you register” names the video step directly. “Stop guessing. Start discovering.” introduces the Find Your Skill Framework. Supporting copy explains the practical work before asking for a registration. The shared HTML reference is a copy source, not a visual template. Its five-day income claim conflicts with the current 45-day program goal, so the page keeps the 45-day goal and its outcome qualification.

## Layout and motion

Desktop sections use asymmetric two-column grids; mobile sections stack in reading order. Major sections have generous vertical space. The scroll layer follows the supplied iFindos reference: Lenis eases desktop wheel scrolling, while touch and reduced-motion users retain native scrolling. One-way IntersectionObserver reveals use a different treatment according to content: the watch, income, and story headlines rise line by line through a text mask; videos come into focus with a small scale change; program steps, achievements, and the form use opacity only. The promise and registration headlines remain immediately readable. The footer wordmark rises letter by letter as the closing gesture. All content is visible without JavaScript, and reduced-motion disables these transitions. Three thin SVG threads begin at the left edge of the viewport, move faintly behind the hero copy, and enter the orange artwork. Each travels left to right on a 12-second loop, offset four seconds from the next. A short invisible pause at each end keeps the repeat seamless. Their dark portions sit on the cream background and their light portions sit inside the orange panel, while the black circle covers the threads at its center. Reduced-motion keeps the threads still.

## Assets

The provided logo is cropped for the header. The two videos are optimized to H.264 MP4 (about 3.7 MB and 6.3 MB). The main video's poster uses a real frame of its presenter at 18 seconds. The community compilation is reframed to 16:9: its opening landscape clip fills the picture, while portrait clips sit against blurred footage from the same shot. The original files remain in the project root as supplied source assets.
