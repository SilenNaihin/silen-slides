# Slide Presentation Template

Canonical starting point for Vercel/Notion/Apple Keynote-style presentations using Next.js + Tailwind CSS v4.

## Quick Start

```bash
# Copy this template into your project
cp -r template/ <your-presentation-name>/presentation/
cd <your-presentation-name>/presentation/

# Install and run
npm install
npm run dev
# → http://localhost:3012
```

## Adding Slides

1. Create a new file in `components/slides/SlideNN<Name>.tsx`
2. Use the `Slide` component wrapper:
   ```tsx
   import { Slide } from "../Slide";
   
   export default function Slide04MySlide() {
     return (
       <Slide>
         <h1 className="text-4xl font-bold">Title</h1>
         {/* content */}
       </Slide>
     );
   }
   ```
3. Import and add to the `slides` array in `app/page.tsx`

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | `#0070F3` | Primary blue (Vercel) |
| `--color-foreground` | `#111111` | Body text |
| `--color-muted` | `#666666` | Secondary text |
| `--color-subtle` | `#999999` | Tertiary text |
| `--color-border` | `#e5e7eb` | Card/table borders |
| `--color-surface` | `#fafafa` | Code/math backgrounds |

### Typography
- **Titles**: `text-4xl font-bold` or `text-5xl font-bold` (centered slides)
- **Body**: `text-base` to `text-xl` — always readable at projection distance
- **Annotations**: `text-sm` minimum

### Aesthetic Principles
- **Monochrome + one accent**: Never use 3+ different colors on one slide
- **Spacious**: One idea per slide, generous whitespace
- **Full-width**: Tables and images should use available space
- **Big text**: This is a slideshow, not a paper

## Navigation

- Arrow keys (left/right/up/down)
- Click left/right thirds of the screen
- Space bar advances
- Dot indicators at bottom center
- URL hash updates for direct linking (`#slide-5`)

## Transitions

CSS-only opacity + translateX with cubic-bezier easing:
- Entering: fade in from right (translateX 30px → 0)
- Exiting: fade out to left (translateX 0 → -30px)

## KaTeX Math

```tsx
import { BlockMath, InlineMath } from "../KaTeX";

// Inline
<InlineMath math={String.raw`\pi_\theta`} />

// Block (display mode)
<BlockMath math={String.raw`J(\theta) = \mathbb{E}[R]`} />
```

Use `String.raw` template literals to avoid double-escaping backslashes.

## Images

Place in `public/assets/`. Reference as `/assets/filename.png`.

For screenshots/figures, use `object-contain` with `max-height`:
```tsx
<img src="/assets/figure.png" className="w-full max-h-[400px] object-contain" />
```

Never use `object-cover` with fixed heights — it crops content.
