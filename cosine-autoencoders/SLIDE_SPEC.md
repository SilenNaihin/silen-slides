# SLIDE_SPEC: Size Doesn't Matter — Cosine-Scored Sparse Autoencoders

## Meta

| Field | Value |
|-------|-------|
| Title | Size Doesn't Matter: Cosine-Scored Sparse Autoencoders |
| Authors | Silen Naihin, Lev Stambler |
| Audience | Technical but mixed (lab meeting) — brief primers on SAEs/superposition, then focus on contribution |
| Duration | 30 minutes (~20 slides) |
| Port | 3012 |
| Template | Copy from `/Users/silen/Desktop/Projects/silen-slides/template/` |
| Paper repo | `/Users/silen/Desktop/Projects/mechinter--rnh/` |
| Paper PDF | `/Users/silen/Downloads/size-doesnt-matter-cosine-scored-autoencoders.pdf` |

---

## Image Asset Table

| Source path | Assets filename | What it shows |
|-------------|----------------|---------------|
| `../mechinter--rnh/figures/fig_architecture_composite.png` | `fig_architecture_composite.png` | Hero figure: standard vs cosine encoder architecture + FVE/probing bars + learned a number line |
| `../mechinter--rnh/figures/fig_rmsnorm_placement.png` | `fig_rmsnorm_placement.png` | Diagram showing RMSNorm on the path into sublayers while SAE hooks the raw residual stream |
| `../mechinter--rnh/figures/fig_parasitism.png` | `fig_parasitism.png` | Stacked bar chart: standard's unmatched features fire 86% on Q4 high-norm tokens |
| `../mechinter--rnh/figures/fig_q4_pathology.png` | `fig_q4_pathology.png` | Per-quartile FVE showing standard collapse at Q4 (FVE=-184) + reconstruction norm ratio |
| `../mechinter--rnh/figures/fig_arch_overview.png` | `fig_arch_overview.png` | Score-surface geometry: contour plots for a=1, a=0, a=0.258 + per-feature a_i distribution |
| `../mechinter--rnh/figures/fig_hero.png` | `fig_hero.png` | Figure 2: per-task probing (A), firings vs token norm (B), recon size vs token norm (C) |
| `../mechinter--rnh/figures/fig_sparse_probing_per_dataset.png` | `fig_sparse_probing_per_dataset.png` | Figure 4: aggregate sparse-probing accuracy dumbbell chart (0.678→0.815 top-1) |
| `../mechinter--rnh/figures/fig_discovery_vs_separability.png` | `fig_discovery_vs_separability.png` | Figure 5: discovery dominates separability — shared vs all features breakdown |
| `/Users/silen/Desktop/Screenshot 2026-05-21 at 12.26.14.png` | `ablations_table.png` | Full design-space ablation table with all variant rows |
| `../mechinter--rnh/figures/fig_a_distribution.png` | `fig_a_distribution.png` | Per-feature a_i distribution at 5M vs 50M tokens (Qwen3-8B L27) |

---

## Design System

Uses the template defaults:
- **Accent**: `#0070F3` (Vercel blue)
- **Foreground**: `#111111`
- **Muted**: `#666666`
- **Border**: `#e5e7eb`
- **Surface**: `#fafafa`
- **Font**: Inter (sans), JetBrains Mono (mono)
- **Transitions**: opacity 0.45s + translateX(30px), cubic-bezier(0.4, 0, 0.2, 1)

---

## Slide-by-Slide Specification

---

### Slide 01 — Title

**Purpose**: Opening slide. Paper title, authors, context.

**Content**:
- Title: "Size Doesn't Matter: Cosine-Scored Sparse Autoencoders"
- Subtitle: "Fixing the scoring geometry for dictionary learning on normalized representations"
- Authors: Silen Naihin, Lev Stambler
- Date: ICML 2026 (Under Review)
- Small tagline bottom: "Qwen3-8B · 500M tokens · +14.9% sparse-probing top-1"

**Layout**: Centered, vertically stacked. Title in `text-5xl font-bold`, subtitle in `text-xl text-[--color-muted]`, authors in `text-lg`, date smaller below.

**No images.**

---

### Slide 02 — Outline

**Purpose**: Roadmap so the audience knows the arc.

**Content**:
Numbered list:
1. The interpretability problem — why look inside models?
2. Sparse autoencoders — extracting features from superposition
3. The norm problem — when magnitude hijacks meaning
4. Our fix — cosine-scored encoders
5. Results — +14.9% interpretability at matched reconstruction
6. What's next

**Layout**: Single column, left-aligned list. Each item `text-xl`. Current section could be highlighted with accent during the talk (but static for now — just show all items).

**No images.**

---

### Slide 03 — The Black Box Problem

**Purpose**: Motivate mechanistic interpretability. Why do we care about understanding model internals?

**Content**:
- Header: "Understanding What Models Know"
- Key point: Neural networks learn rich internal representations, but we can't directly read them
- Bullet points:
  - Models represent concepts as directions in high-dimensional space
  - A single neuron often responds to multiple unrelated concepts (polysemanticity)
  - We need tools to decompose these tangled representations into interpretable pieces
- Callout box: "Goal: Find a dictionary of human-interpretable features that explain model behavior"

**Layout**: Title top, bullets left-aligned with generous spacing (`text-xl`, `space-y-4`). Callout at bottom with accent left-border.

**No images.** (Recreate a simple conceptual diagram as HTML: a circle labeled "neuron" with 3 arrows pointing to "cat", "car", "calendar" to illustrate polysemanticity)

**References**: Transformer Circuits — Toy Models of Superposition (2022), Scaling Monosemanticity (2024)

---

### Slide 04 — Superposition & the Linear Representation Hypothesis

**Purpose**: Quick primer on superposition — models pack more concepts than dimensions.

**Content**:
- Header: "Superposition"
- Key concept: Models store more features than they have dimensions by encoding them as nearly-orthogonal directions
- Simple visual: Show d=2 space with 3+ feature vectors packed in (recreate as HTML/SVG — simple arrows in a circle)
- Text: "With d dimensions, a model can represent >> d features if they're sparse (rarely active together)"
- Note: "This is why individual neurons are polysemantic — they participate in multiple feature directions"

**Layout**: Two-column. Left: text explanation. Right: simple HTML diagram (2D circle with ~5 arrows radiating at various angles, labeled "feature 1", "feature 2", etc.)

**No images** — recreate as styled HTML/SVG.

---

### Slide 05 — Sparse Autoencoders: The Tool

**Purpose**: Introduce SAEs as the solution for extracting features from superposition.

**Content**:
- Header: "Sparse Autoencoders"
- The idea: Project activations into a much larger space (d → d_sae) where each dimension corresponds to one interpretable feature
- Math (KaTeX):
  - Encoder: `z = \sigma\bigl((x - b_{\text{dec}}) W_{\text{enc}}^\top + b_{\text{enc}}\bigr)`
  - Decoder: `\hat{x} = z W_{\text{dec}} + b_{\text{dec}}`
  - Loss: `\mathcal{L} = \|x - \hat{x}\|^2`
- Key properties:
  - d_sae >> d (e.g., 65,536 vs 4,096)
  - Sparsity: only k features active per token
  - Each decoder row w_i represents a learned feature direction

**Layout**: Title top. Math block centered with `bg-[--color-surface]` card. Bullet points below.

**References**: Bricken et al. 2023, Cunningham et al. 2023

---

### Slide 06 — From L1 to BatchTopK

**Purpose**: Explain why the field moved from L1 penalty to BatchTopK — L1 creates shrinkage bias.

**Content**:
- Header: "Why BatchTopK?"
- Two-column comparison:
  - **L1 Penalty** (left card, gray border):
    - Loss: `\mathcal{L} = \|x - \hat{x}\|^2 + \lambda \|z\|_1`
    - Problem: constant pressure to shrink ALL activations toward zero
    - Features learn to be small, not sparse → shrinkage bias
    - "Penalizes the features you DO want"
  - **BatchTopK** (right card, accent border):
    - Keep exactly k·N largest pre-activations in each batch
    - No penalty on selected features — they activate at full strength
    - Sparsity by selection, not suppression
    - "Sparse AND faithful"
- Bottom note: "BatchTopK is now the SAEBench community standard (Karvonen et al., 2025)"

**Layout**: Two-column grid with comparison cards. Left card has `border-[--color-border]`, right card has `border-[--color-accent]` with subtle `bg-blue-50/10`.

**No images** — text comparison.

---

### Slide 07 — Problem 1: The RMSNorm Mismatch

**Purpose**: Show that pre-sublayer normalization creates a fundamental mismatch between what the SAE encoder sees and what the model actually reads.

**Content**:
- Header: "The Norm Mismatch"
- Key insight: The SAE hooks the residual stream (raw x), but the model reads x/‖x‖ via RMSNorm
- Image: `fig_rmsnorm_placement.png`
- Annotation text next to image:
  - "RMSNorm strips magnitude before the sublayer reads it"
  - "But the encoder score ⟨w_i, x⟩ = ‖x‖ · cos(x, w_i) scales with ‖x‖"
  - "The encoder detects a quantity the model discards"

**Layout**: Title top. Image takes ~60% width on the right. Text annotations on the left as a bullet list.

**Image**: `fig_rmsnorm_placement.png` — shows residual stream splitting into RMSNorm path (blue, to sublayer) vs raw path (orange, to SAE encoder).

---

### Slide 08 — Problem 2: Norm Detectors Instead of Feature Detectors

**Purpose**: Show the consequence — under BatchTopK, high-norm tokens steal all the activation slots regardless of content.

**Content**:
- Header: "BatchTopK Becomes a Norm Detector"
- Explanation:
  - BatchTopK picks the top kN pre-activations across the batch
  - High-‖x‖ tokens inflate ALL their pre-activations simultaneously
  - They claim disproportionate slots regardless of content alignment
  - Result: features that fire on magnitude, not meaning
- Image: `fig_parasitism.png`
- Caption: "Standard's unmatched features (55,789) fire 86% on Q4 (highest-norm) tokens. The dictionary wastes capacity on norm detection."

**Layout**: Title top. Short explanation (3-4 lines, `text-lg`). Image below, near-full-width (`max-h-[350px] object-contain`). Caption in `text-base text-[--color-muted]`.

**Image**: `fig_parasitism.png` — stacked horizontal bars showing activation share by token-norm quartile.

---

### Slide 09 — The Consequence: Catastrophic Q4 Reconstruction

**Purpose**: Quantify the damage — standard SAE reconstructs high-norm tokens at 9.5x their actual norm.

**Content**:
- Header: "Standard SAEs Blow Up on High-Norm Tokens"
- Image: `fig_q4_pathology.png`
- Key callout: "Q4 FVE = −184 — the standard SAE reconstructs high-norm tokens at 9.5× their input norm"
- Note: "Both cosine variants stay positive across all quartiles"

**Layout**: Image centered, large (`max-h-[420px]`). Callout box below image with accent styling. Short note in muted text.

**Image**: `fig_q4_pathology.png` — two-panel: top shows per-quartile FVE (standard collapses at Q4), bottom shows reconstruction/input norm ratio (standard hits 9.5×).

---

### Slide 10 — Our Fix: The Cosine Score

**Purpose**: Introduce the mathematical reformulation — replace inner product with learned cosine blend.

**Content**:
- Header: "The Cosine Encoder"
- Narrative build-up (3 steps, show as progression):
  1. **Start**: Standard score `s_i(x) = \langle w_i, x \rangle` (couples direction + magnitude)
  2. **Idea**: Remove ‖x‖ → use `cos(x_c, w_i)` (but decoder still needs scale)
  3. **Solution**: Let the optimizer choose how much norm to keep:
- Main equation (large, centered, in surface card):
  `s_i(x) = e^b \|x_c\|^a \cdot \cos(x_c, w_i) + b_{\text{enc},i}`
- Explanation below:
  - `a = 0` → pure cosine (direction only)
  - `a = 1` → recovers inner product
  - `a` is learned — optimizer decides the right geometry
  - Initialize `a = 0`, let training find the sweet spot

**Layout**: Title top. Numbered progression in `text-lg` with arrow indicators. Main equation in centered card (`bg-[--color-surface] p-6 rounded-lg`). Bullet explanations below.

**Math**: All KaTeX. Use `String.raw` for LaTeX strings.

---

### Slide 11 — Log-Exponential Parameterization & Per-Feature Extension

**Purpose**: Show the full parameterization and the per-feature extension.

**Content**:
- Header: "Making It Trainable"
- Two sections:
  
  **Global a** (simpler):
  - Log-exp form: `s_i(x) = \exp(a \log\|x_c\| + b) \cdot \cos(x_c, w_i) + b_{\text{enc},i}`
  - Single scalar a shared across all features
  - Well-conditioned gradients in a regardless of ‖x‖ (Appendix B)
  - Adds 1 parameter total
  
  **Per-feature a_i** (full version):
  - `a_i = a_{\text{base}} + \delta_i` — shared base + per-feature offset
  - Each feature learns its own norm dependence
  - Adds 1 + 2·d_sae parameters (< 0.1% overhead)
  - Initialized: `a_base = 0`, `δ_i = 0`

- Bottom: "The optimizer is free to recover inner product (a=1). It never does."

**Layout**: Two side-by-side cards. Left: "Global" card. Right: "Per-feature" card (accent border). Bottom callout spanning full width.

**Math**: KaTeX for all equations.

---

### Slide 12 — Architecture Overview

**Purpose**: Show the full architecture comparison diagram — our hero figure.

**Content**:
- Header: "Architecture & Headline Results"
- Image: `fig_architecture_composite.png` (full-width)
- Three callouts below the image (inline, small cards):
  - "FVE matched: 0.770 vs 0.771"
  - "Probing top-1: +14.9%"
  - "Learned a ≈ 0.26 (far from inner product)"

**Layout**: Title top. Image full-width (`w-full max-h-[350px] object-contain`). Three small stat cards below in a `grid grid-cols-3 gap-4`.

**Image**: `fig_architecture_composite.png` — the paper's Figure 1.

---

### Slide 13 — Score-Surface Geometry

**Purpose**: Visualize what different a values mean geometrically.

**Content**:
- Header: "What Does the Score Surface Look Like?"
- Image: `fig_arch_overview.png` (full-width)
- Brief annotations:
  - Panel 1 (a=1): "Inner product — hyperbolic curves mean high-norm tokens outscore low-norm ones at any alignment"
  - Panel 2 (a=0): "Pure cosine — vertical curves, norm ignored entirely"
  - Panel 3 (a=0.258): "Learned — mild tilt, close to cosine"
  - Bottom strip: "Per-feature a_i distribution clusters near 0.08, well below inner-product limit"

**Layout**: Image large on top (`max-h-[300px]`). Annotations below as a 3-column mini grid matching the panels. Bottom note about distribution in muted text.

**Image**: `fig_arch_overview.png` — contour plots + a_i distribution.

---

### Slide 14 — Results: Per-Task Sparse Probing

**Purpose**: Show the headline probing results broken down by task.

**Content**:
- Header: "Cosine Wins on Probing Across Tasks"
- Image: `fig_hero.png` (full-width)
- Key points below image:
  - Panel A: Per-feature cosine wins 7/8 tasks, +14.9% mean. Sentiment is the only reversal (+3.5% for standard — magnitude carries task-relevant signal there)
  - Panel B: Standard fires 29% more on high-norm tokens (selective firing bias)
  - Panel C: Standard reconstructs Q4 at 9.5× input norm (magnitude leaks into sparse code)

**Layout**: Image full-width on top (`max-h-[320px]`). Three-point summary below as a bulleted list, `text-base`.

**Image**: `fig_hero.png` — Figure 2 (3-panel: probing by task, firings vs norm, recon norm ratio).

---

### Slide 15 — Aggregate Probing & Table 1

**Purpose**: Show the aggregate numbers and the headline comparison table.

**Content**:
- Header: "Headline Numbers"
- Two-column layout:
  - Left: Image `fig_sparse_probing_per_dataset.png` (dumbbell chart)
  - Right: Recreated Table 1 as HTML table:

| | Standard | Global a | Per-feature |
|---|---|---|---|
| FVE | 0.770 | 0.769 | **0.771** |
| Probing top-1 | 0.667 | 0.800 | **0.815** |
| Q4 FVE | −184 | **+0.33** | +0.25 |
| Dead % | 0.0 | 0.0 | 0.0 |
| Learned a | — | 0.258 | mean 0.076 |

- Note below table: "Qwen3-8B L18, 500M tokens, d_sae = 65,536. Only the encoder score changes."

**Layout**: `grid grid-cols-2 gap-8 items-center`. Image left (object-contain, fills column). Table right with standard styling.

**Images**: `fig_sparse_probing_per_dataset.png`

---

### Slide 16 — Discovery Dominates Separability

**Purpose**: Show that the probing gap comes from discovering features the standard encoder never learns (not from better separation of shared features).

**Content**:
- Header: "The Gap Is Discovery, Not Separability"
- Image: `fig_discovery_vs_separability.png`
- Explanation:
  - "Shared features" = matched across both dictionaries (Pearson > 0.7, same direction)
  - Standard's flat line: its unique features add NO probing signal — they encode norm, not content
  - Cosine's steep rise: its unique features encode real interpretable concepts
  - "~87% of the gap comes from features the cosine encoder discovers and standard does not"

**Layout**: Image centered (`max-h-[350px]`). Explanation as bullet list below in `text-base`.

**Image**: `fig_discovery_vs_separability.png` — Figure 5.

---

### Slide 17 — Ablations

**Purpose**: Show the full design-space ablation table confirming which design choices matter.

**Content**:
- Header: "Design Space Ablation"
- Image: `ablations_table.png` (full-width)
- Key takeaways (2-3 bullets below):
  - Global a alone gets most of the gain (probing 0.800 vs 0.815 for per-feature)
  - Encoder unit-normalization is essential (makes the score true cosine)
  - Decoder normalization and bias restoration don't matter much — it's all in the encoder score geometry

**Layout**: Image full-width (`max-h-[380px] object-contain`). Bullets below in `text-base`.

**Image**: `ablations_table.png` — the desktop screenshot showing the full variant × design-knob matrix.

---

### Slide 18 — Per-Feature a Distribution

**Purpose**: Show that training consistently drives a away from inner product (a=1), confirming direction is the useful signal.

**Content**:
- Header: "Training Chooses Direction Over Magnitude"
- Image: `fig_a_distribution.png`
- Annotation:
  - "Initialized at a=0 (pure cosine)"
  - "After 50M tokens, per-feature mean = 0.11 — still far from inner product (a=1)"
  - "No feature ever approaches the inner-product regime"
  - "The optimizer independently confirms: direction, not magnitude, is the useful signal"

**Layout**: Image centered (`max-h-[350px]`). Annotations as bullets on the right or below.

**Image**: `fig_a_distribution.png` — density plot of per-feature a_i at 5M vs 50M tokens.

---

### Slide 19 — Limitations & Future Directions

**Purpose**: Honest discussion of scope and what comes next.

**Content**:
- Header: "Limitations & Future Work"
- Limitations (left column):
  - Bounded scope: cosine loses at deep LayerNorm layers (Pythia, Falcon) where magnitude IS useful
  - Sentiment reversal: +3.5% for standard on this task — magnitude carries signal
  - Single-seed headline (but 3-seed run at 50M gives SD < 0.001 FVE)
  - Not tested: TopK, JumpReLU, gated selectors; scale > 8B; instruction-tuned models
- Future (right column):
  - Fold RMSNorm gain g into the score: `cos(g ⊙ x_c, w_i)` — align with what sublayers actually read
  - Drop decoder unit-norm (costs ~22 FVE but the constraint may be unnecessary under cosine)
  - Initialization sweep over a (currently always 0)
  - Auxiliary-loss-free recipe: cosine retains +6.3% FVE and 2.39× more alive features without it

**Layout**: Two-column grid. Left card: "Limitations" with gray border. Right card: "Future Directions" with accent border.

---

### Slide 20 — Takeaway & Practical Recipe

**Purpose**: End memorably. Give the audience a concrete action item.

**Content**:
- Header: "The Practical Recipe"
- Large centered callout box:
  - "Unit-normalize encoder rows"
  - "Replace score with: `e^b ‖x_c‖^a cos(x_c, w_i) + b_{enc,i}`"
  - "Initialize a=0, b=log√d_model"
  - "That's it. One scalar. Drop-in replacement."
- Below: "Global variant adds 2 parameters. Per-feature adds < 0.1% overhead."
- Bottom: "Paper + code: [repo link]"
- Final note: "We believe cosine scoring should be the default for dictionary learning on normalized representations."

**Layout**: Centered. Recipe in a large accent-bordered card. Final quote in italic muted text below.

---

## Agent Assignment Plan

| Agent | Slides | Rationale |
|-------|--------|-----------|
| Agent 1 | 01–04 | Title, outline, motivation — simple text slides, share context |
| Agent 2 | 05–06 | SAE math + BatchTopK comparison — share math patterns |
| Agent 3 | 07–09 | The two problems + consequence — share narrative, use images |
| Agent 4 | 10–12 | Our solution: math reformulation + architecture — heaviest math, single coherent build |
| Agent 5 | 13–15 | Results (geometry, probing, table) — data-heavy slides with images |
| Agent 6 | 16–18 | Discovery, ablations, a-distribution — analysis slides |
| Agent 7 | 19–20 | Limitations + recipe — conclusion slides |

---

## Implementation Notes

- Copy template from `/Users/silen/Desktop/Projects/silen-slides/template/`
- Copy all figure PNGs to `presentation/public/assets/`
- Copy ablations screenshot to `presentation/public/assets/ablations_table.png`
- Port: 3012
- KaTeX: use direct `katex` package with `renderToString` + `String.raw` template literals
- Recreate as HTML:
  - Slide 03: polysemanticity diagram (neuron → multiple concepts)
  - Slide 04: superposition arrows in 2D circle
  - Slide 06: L1 vs BatchTopK comparison cards (text only)
  - Slide 15: Table 1 as HTML table
- Embed as images: all paper figures (fig_hero, fig_architecture_composite, fig_rmsnorm_placement, fig_parasitism, fig_q4_pathology, fig_arch_overview, fig_sparse_probing_per_dataset, fig_discovery_vs_separability, fig_a_distribution, ablations_table)
