# CLaaS Presentation — Comprehensive Slide Specification

## Meta: What This Document Is

This is the single source of truth for building a Vercel/Notion-style HTML presentation for the CLaaS paper. Each agent working on a section of slides should read this document in full and then implement ONLY their assigned slides. The presentation is a single `index.html` file at `/Users/silen/Desktop/Projects/tmp/claas-presentation-v2/index.html` served on `localhost:3012`.

**IMPORTANT CONTEXT**:
- This is a **30-minute talk** (lab meeting style, mixed technical audience)
- The **main takeaway is CLaaS as a system** — SDPO happens to be the best algorithm inside it, but the system contribution (abstracting continual online learning behind a chat API) is the headline
- Total slides: **22**
- The audience is "technical but mixed" — some need the RL primer, others are experts. Include background but don't belabor it.

---

## Source Materials — File Paths for Agents

### The Paper
- **Full paper PDF**: `/Users/silen/Downloads/ICML_2026_Workshop_Online_Continual_Learning (1).pdf`
- **Paper source / project repo**: `/Users/silen/Desktop/Projects/claas-verl/`
- **Paper figures**: `/Users/silen/Desktop/Projects/claas-verl/figures/ih_challenge/`

### Images (all copied to `/Users/silen/Desktop/Projects/tmp/claas-presentation-v2/assets/`)
| Filename in assets/ | Source | What it shows |
|---|---|---|
| `claas-system-cute.png` | ~/Downloads/Screenshot 2026-05-21 at 10.40.12.png | Cute simplified diagram: Robot "Agent" ↔ Globe "World", with CLaaS box below containing "Replay Buffer → Async Trainer". Used on title slide. |
| `replay-ablation.png` | ~/Downloads/Screenshot 2026-05-21 at 10.37.25.png | Line chart: Defender success rate (y-axis 0-100%) vs Checkpoint after split (x-axis S0-S4). Lines for: No context (blue, flat ~28%), Buffer age 1 (orange ~35%), Buffer age 5 (green ~38%), Buffer age 25 (red, climbing to ~55%), Buffer age 50 (purple, collapses after S3). |
| `scenario-walkthrough.png` | ~/Desktop/Screenshot 2026-05-21 at 10.32.18.png | Full scenario walkthrough: System prompt with 3 rules on left, Turn 1 (attacker/defender/PASS r=1), Turn 2 (attacker adapts/defender fails/FAIL r=0), Turn 3 (stop-on-success), Replay Buffer on right, Training box (GPU 0/GPU 1), color-coded legend at bottom. |
| `algorithm.png` | ~/Desktop/Screenshot 2026-05-21 at 10.24.24.png | Algorithm 1 pseudocode box: Require line, then lines 1-16 showing ROLLOUT and TRAIN procedures running in parallel. Clean LaTeX-typeset. |
| `architecture.png` | ~/Desktop/Screenshot 2026-05-21 at 10.23.53.png | Full system architecture: Top = "User-facing interface" (REST API ↔ Agent harness ↔ Live environment), Bottom = "CLaaS internals" (Inference server → Reward function → Experience replay buffer → Training engine → LoRA adapter), with "reload weights" dashed arrow back to inference server. |
| `sdpo-highlevel.png` | Temp screenshot | SDPO key insight diagram: "Key insight: the same model, with extra info, can be used as a reward model". Shows Solution → Model(Teacher) → ROLLOUT tokens, Prompt → Model(Student) → ROLLOUT tokens, with "Token-level supervision via KL divergence" arrow between the two token sequences. Lightning bolt = ICL on teacher. |
| `sdpo-math.png` | Temp screenshot | REINFORCE → SDPO math transformation: Left shows standard PG (∇_θ J = E[Σ ∇_θ log π_θ(a_t|s_t) · (Σ γ^{k-t} r_k)]) with reward term crossed out in red. Arrow labeled "SDPO" points right. Right side (in red box): ∇_θ J = E[Σ ∇_θ log π_θ(a_t|s_t) · log(π_θ(a_t|s_t, f) / π_θ(a_t|s_t))]. The ratio replaces the reward. |
| `rl-primer.png` | Temp screenshot | Reference image (don't embed): Shows J(θ) = E[Σγ^t r_t], policy gradient formula, and bullet points about rollouts and nudging likelihoods. |
| `sdpo-advantages.png` | https://self-distillation.github.io/figures/SDPO/advantages.png | SDPO advantages infographic from the official site. Shows why SDPO is more sample efficient. |
| `future-openclaw.png` | future_screenshots/10.49.23.png | Tweet from @tinkerapi showing CLaaS deployed with Tinker, quoting Kion about ICL being a hack. Shows CLaaS lobster logo. Caption: "CLaaS on OpenClaw to continuously distill user preferences" |
| `future-autoresearch.png` | future_screenshots/10.49.41.png | Bar chart: "Autoresearch Results" — improvement in val_bpb over unmodified train.py. Bars: SDPO Ckpt+ICL (-3.1%), SDPO training (-3.1%), Karpathy Agent (-2.8%), SDPO Ckpt+Single (-2.6%), Single-turn (-2.3%), GRPO training (-1.8%), ICL Baseline (-1.7%). Caption: "NanoGPT autoresearch for test-time discovery with self-distillation" |
| `future-selfimprove.png` | future_screenshots/10.50.14.png | Eval dashboard showing "LAST RUN RESULTS" — Org traces: 42, Patterns detected: 19, Eval judgments: 84 (14 failed), Clusters formed: 5, failure clusters tagged. Below: Test subject org_37tM5, 42 generations, 14/15 failures detected (94%), 4 proposals generated, 3 deployed. Caption: "Autonomously self-improving companies" |
| `future-lora-identity.png` | future_screenshots/10.52.57.png | CLaaS Train UI showing "Self-distillation in progress" Step 1253/2000, identity 68%. Shows SDPO self-distillation flow (prompt → student → teacher → weights update), loss curve declining, grad norm, LoRA weight magnitudes per layer, terminal log. Caption: "LoRA distillation for your identity" |

### External References for SDPO Agent
- SDPO paper: https://arxiv.org/abs/2601.20802
- SDPO website: https://self-distillation.github.io/SDPO.html
- Advantages image: https://self-distillation.github.io/figures/SDPO/advantages.png (already downloaded to assets/)

---

## Design System — STRICT Requirements

### Visual Style
- **Aesthetic**: Clean Vercel/Notion. Think Apple Keynote. Lots of whitespace. No visual clutter.
- **Background**: Pure white (#ffffff) or very subtle off-white (#fafafa)
- **Typography**: Inter font family (load from Google Fonts), monospace (JetBrains Mono or system) for code/algorithms
- **Text colors**: Primary = #111 (near-black), Secondary = #666, Tertiary = #999
- **Accents**: Vercel blue (#0070F3) for emphasis, warm orange (#F5A623) for highlights/callouts, subtle green (#10B981) for positive results, red (#EF4444) for negative/crossed-out
- **Cards/boxes**: Very subtle border (#e5e7eb), rounded corners (12px), optional very light shadow (0 2px 8px rgba(0,0,0,0.04))
- **Tables**: Clean, no heavy borders. Header row with light gray bg (#f9fafb). Alternating rows optional. Highlight row with subtle blue bg (#eff6ff).

### Transitions & Animations
- **SIMPLE ONLY**. No 3D, no bounce, no spring physics, no particle effects.
- Slide transitions: CSS opacity fade (300ms ease) OR translateX slide-left (400ms ease)
- Within-slide animations: None by default. Only subtle fade-in on first render if needed.
- "Nothing crazy animation wise just make it clean like an apple presentation would be"

### Layout
- Each slide: `width: 100vw; height: 100vh; overflow: hidden`
- Content container: `max-width: 1100px; margin: 0 auto; padding: 80px 60px`
- Slides use CSS scroll-snap or JS-based slide switching with arrow keys
- NO scrolling within slides — everything must fit in viewport

### Navigation
- Left/Right arrow keys advance/retreat slides
- Small dot indicators at bottom center (current dot filled, others outlined)
- Slide number in bottom-right corner (subtle, gray, small)
- Click left/right halves of screen also navigates

### Technical Stack
- Single `index.html` file — NO build step, NO framework
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- KaTeX via CDN for math rendering
- Inter font from Google Fonts
- Vanilla JS for navigation
- All images referenced as `assets/filename.png` (relative paths)

### Port
- Served via `python3 -m http.server 3012` from the presentation directory

---

## Slide-by-Slide Specification

---

### SLIDE 1: Title

**Purpose**: First impression. Clean, confident, academic but modern.

**Content**:
- Title (large, bold, text-5xl): "CLaaS: Continual Learning as a Service"
- Subtitle (text-xl, gray-600): "Sample Efficient Online Learning for Deployed Agents"
- Spacer
- Image: `assets/claas-system-cute.png` — the cute robot/world/CLaaS diagram. Display at ~380px width, centered, with subtle rounded corners.
- Below image, spacer
- Collaborators (text-lg, gray-700): "Kion Fallah · Silen Naihin · Barak Widawsky"
- Venue (text-sm, gray-400): "ICML 2026 Workshop on Online Continual Learning"

**Layout**: Everything vertically centered on the slide. Clean stack.

**Speaker notes**: "Today we're presenting CLaaS — a system that lets deployed LLM agents improve continuously from their own experiences, abstracted behind a simple chat API."

**Transition TO next**: Fade

---

### SLIDE 2: Table of Contents

**Purpose**: Give the audience a roadmap. Clean numbered list.

**Content**:
- Header (text-3xl, bold): "Outline"
- Numbered list with generous spacing (each item ~40px height):
  1. **The Problem** — Why deployed agents need continual learning
  2. **Background** — Reinforcement learning primer
  3. **Problem Setup** — The IH-Challenge & formal framework
  4. **CLaaS** — System architecture & the algorithm
  5. **Experience Replay** — Buffer design & sample efficiency
  6. **Results** — Parametric updates vs. in-context learning
  7. **Algorithm Deep Dive** — REINFORCE++ vs PPO vs SDPO
  8. **Self-Distillation** — Why SDPO wins
  9. **What We're Building** — Current projects
  10. **The Future** — Where this leads

**Layout**: Left-aligned list, starting ~20% from top. Each number in accent blue, text in dark. Subtle left border line connecting the numbers.

**Speaker notes**: "Here's our roadmap. We'll start with the problem, build up the technical framework, show our system and results, then look at where we're heading."

**Transition TO next**: Slide-left

---

### SLIDE 3: The Problem — Why It Matters

**Purpose**: Motivate the entire line of work. Make the audience feel the pain.

**Content**:
- Header (text-3xl, bold): "Deployed Agents Drift"
- Subtitle (text-lg, gray-500): "And context windows can't save them"
- Four problem bullets (each as a clean card with subtle left-border accent):
  1. "LLM agents face **distribution shift** in dynamic environments — user requests change, tools update, environments evolve"
  2. "In-context learning is **transient** — bounded by context window, lost between sessions, doesn't compound"
  3. "Real environments can't be reset — each scenario gives a **single rollout**, no counterfactual replay"
  4. "Need: **persistent improvements** that generalize to future tasks while retaining prior capabilities"
- Bottom callout box (blue border-left, light blue bg): 
  - "Goal: Self-improving agents that learn from deployment experience and get better over time"

**What to say**: "Every deployed agent eventually hits a distribution shift. The standard fix — stuff examples into context — is a band-aid. Context is finite, transient, and doesn't transfer. What if we could make the agent actually learn from its experiences and improve its weights during deployment?"

**Key paper reference**: Introduction paragraphs (lines 001-054 of paper), especially: "context is a transient and limited resource" and "parametric updates via on-policy RL have been effective for generalization in agentic capabilities"

**Transition TO next**: Fade

---

### SLIDE 4: The Problem — ICL Limitations

**Purpose**: Quantify why ICL isn't enough. Set up the parametric approach.

**Content**:
- Header (text-3xl, bold): "In-Context Learning: Necessary but Insufficient"
- Two-column comparison (side by side cards):
  - **Left card** (subtle red/gray tint): "In-Context Learning"
    - "Transient — lost between sessions"
    - "Bounded — limited token budget"
    - "Diminishing returns on new scenarios"
    - "Final rate: **24.1%**"
  - **Right card** (subtle blue/green tint): "Parametric Updates (CLaaS)"
    - "Persistent — baked into weights"
    - "Unbounded — compounds over time"
    - "Transfers to unseen future tasks"
    - "Final rate: **75.2%**"
- Between them: Arrow pointing left→right with label "3× improvement"
- Bottom insight: "Key asymmetry: An attacker only needs to find ONE exploit (ICL accumulates attacks easily). A defender must cover ALL rules simultaneously (ICL examples don't generalize to novel rule combinations)."

**Key paper reference**: Table 1 results, and Appendix A.4 ICL baseline description (lines 440-494). The asymmetry argument is in Appendix A.2 (lines 385-395).

**What to say**: "ICL actually makes the defender WORSE over time in our setting — it drops from 27.2% baseline to 24.1%. Why? Because the attacker's ICL is much more effective — it only needs one exploit per scenario. The defender's ICL can't cover every novel combination of rules."

**Transition TO next**: Slide-left

---

### SLIDE 5: RL Primer

**Purpose**: Get everyone on the same page about policy gradient RL. Technical but mixed audience — some need this, others are experts. Make it clean and annotated so experts see rigor while newcomers get intuition.

**IMPORTANT**: Recreate this as styled HTML with KaTeX math. Add more explanation than the reference image — specifically, add definitions/annotations pointing to each part that needs definition or could be ambiguous. The reference image is at `assets/rl-primer.png` but DO NOT embed it — recreate and expand.

**Content**:
- Header (text-3xl, bold): "Reinforcement Learning for Language Models"
- Section 1 — The Objective (with annotation):
  - KaTeX: `J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta} \left[ \sum_{t=0}^{T} \gamma^t r_t \right]`
  - Right-side annotation (gray, italic): "Maximize expected cumulative reward under policy π_θ"
  - Below annotation pointing to π_θ: "π_θ = the model's policy (its probability distribution over next tokens)"
  - Below annotation pointing to γ^t: "γ = discount factor (how much we value future vs immediate rewards)"
  - Below annotation pointing to r_t: "r_t = reward at step t (from environment/verifier)"

- Section 2 — Policy Gradient (with annotations):
  - KaTeX: `\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta} \left[ \sum_{t=0}^{T} \nabla_\theta \log \pi_\theta(a_t | s_t) \cdot \left( \sum_{k=t}^{T} \gamma^{k-t} r_k \right) \right]`
  - Annotation arrows (these should be visually clear callout lines or brackets):
    - Pointing to `∇_θ log π_θ(a_t|s_t)`: **"Direction to change action probability"** — "Which direction in parameter space makes this action more likely?"
    - Pointing to `Σ γ^{k-t} r_k`: **"Scale by future returns"** — "How good was everything that happened after this action?"
    - Pointing to `E_{τ~π_θ}`: **"Average over on-policy rollouts"** — "Sample trajectories from current policy to estimate gradient"
  - Key insight box: "Policy gradient separates the gradient direction (log-prob) from the reward magnitude — this lets us use ANY reward signal"

- Section 3 — Intuition bullets (below the math):
  - "A **rollout** (τ) = sequence of states (prompts) and actions (responses) sampled from the model"
  - "**On-policy** = rollouts generated from the model currently being trained"  
  - "Core idea: Nudge up likelihood of actions with positive reward, nudge down those with negative reward"

**Layout**: Equations centered with generous vertical spacing. Annotations as small gray text with thin connector lines (can be done with CSS borders/pseudo-elements or just positioned text). Intuition bullets at bottom with clean spacing.

**What to say**: "Quick primer for those less familiar with RL. The key insight is that policy gradients give us a recipe: sample rollouts from the current policy, compute rewards, then adjust weights to make good actions more likely and bad actions less likely. The beauty is the reward signal can be anything — a verifier, a judge, environment feedback."

**Transition TO next**: Fade

---

### SLIDE 6: Current Algorithms (GRPO, Standard Approach)

**Purpose**: Explain what everyone else is doing (GRPO/RLVR) and why it doesn't work for our setting.

**Content**:
- Header (text-3xl, bold): "The Standard Approach: Group-Based RL"
- Two algorithm cards:
  - **GRPO** (Group Relative Policy Optimization):
    - "Sample K rollouts for the same prompt"
    - "Compute group advantage: A_i = (r_i - mean(r)) / std(r)"
    - "Update policy toward high-reward rollouts relative to the group"
    - Requirement highlighted: "⚠️ Needs multiple rollouts per prompt (resettable environment)"
  - **RLVR** (RL with Verifiable Rewards):
    - "Use deterministic verifiers (code execution, math checkers) as reward"
    - "Popular for math/coding tasks"
    - "Still relies on offline replay of same prompts"
- Red callout box at bottom:
  - "**The Gap**: These methods require resettable environments where you can sample the same scenario multiple times. Deployed agents face single-rollout, non-stationary environments."
  - "GRPO doesn't qualify for our setting since it relies on group statistics" (direct quote from paper line 103)
- Transition statement (subtle, gray): "→ We need algorithms that work from single rollouts collected online"

**Key paper reference**: Lines 046-054, 098-103

**What to say**: "GRPO is the standard approach — sample multiple completions for the same prompt, compare them to each other, update toward the better ones. But this requires replaying the same scenario. In deployment, each scenario happens once. You can't reset the environment. We need something that works from single trajectories."

**Transition TO next**: Slide-left

---

### SLIDE 7: Problem Setup — Natural Language / Intuition

**Purpose**: First level of the problem setup (of three levels: intuition → algorithm → math). Make it immediately understandable.

**Content**:
- Header (text-3xl, bold): "Learning from a Stream of Scenarios"
- Subtitle (gray-500): "Level 1: The intuition"
- Large visual illustration (built with HTML/CSS, not an image):
  - A horizontal timeline arrow
  - Along it: boxes labeled S₁, S₂, S₃, ... S_N (20 per split, 5 splits)
  - Above the arrow: a curve labeled "Model improves" that trends upward
  - Below certain splits: dotted lines down to "Checkpoint saved"
  - Color coding: Splits in different subtle colors (S1-20 blue, S21-40 green, etc.)
- Four statements in large, readable text (text-xl, generous line spacing):
  1. "An agent faces a **stream of N=100 scenarios**, one at a time"
  2. "Each scenario is a **multi-turn conversation** (attacker prompts → defender responds → verifier grades)"
  3. "The environment gives a **binary reward** after each response (pass/fail)"
  4. "The agent must **improve across scenarios** — generalize forward, don't forget backward"
- Key constraints box:
  - "Single rollout per scenario (no replaying)"
  - "Non-stationary: the attacker adapts too"
  - "5 contiguous splits of 20 scenarios each"

**What to say**: "At the simplest level, here's what's happening. We have 100 scenarios coming in one by one. The model processes each one, gets a reward signal, and we want it to get better over time. The catch: you only see each scenario once, and the distribution is shifting because the attacker is adapting alongside you."

**Transition TO next**: Fade

---

### SLIDE 8: Problem Setup — The Math

**Purpose**: Second level — show the formal mathematical framework. Annotate heavily so the mixed audience can follow.

**Content**:
- Header (text-3xl, bold): "Formal Framework"
- Subtitle (gray-500): "Level 2: The math"

- **Equation 1 — Trajectory Sampling** (with per-symbol annotations):
  - KaTeX (large): `\tau_i \sim \prod_{t=1}^{T} \pi_{\theta^k}(y_{i,t} \mid x_{\leq t}, y_{<t}) \cdot p(x_{i,t} \mid x_{<t}, y_{<t}, s_i)`
  - Annotations (positioned below/beside, connected with subtle lines):
    - `τ_i`: "Full trajectory for scenario i"
    - `π_{θ^k}`: "Policy after k gradient updates generates response"
    - `y_{i,t}`: "Response at turn t (what the model outputs)"
    - `x_{i,t}`: "Prompt at turn t (what the environment/attacker sends)"
    - `p(x_{i,t}|...)`: "Environment transition — the attacker's next move (we don't control this)"
    - `∏`: "Product = joint probability of the full multi-turn sequence"
    - `s_i`: "The scenario specification (system prompt + rules)"

- **Equation 2 — Reward & Buffer**:
  - KaTeX: `r_i = R_i(\tau_i)` with annotation "Verifier scores the full trajectory (binary: pass/fail)"
  - KaTeX: `\mathcal{B}^k \leftarrow \mathcal{B}^k \cup \{s_i, \tau_i, r_i\}` with annotation "Store everything in the replay buffer"

- **Equation 3 — Optimization**:
  - KaTeX: `\theta^{k+1} = \arg\max_\theta \sum_{(\tau_i, r_i) \in \mathcal{B}^k} \ell(\tau_i, \theta, r_i)`
  - Annotation: "Optimize over EVERYTHING in the buffer — not just the latest trajectory. This is the key to sample efficiency."

- Key insight callout (blue left-border): 
  - "k = P(i) ties each trajectory to the exact policy that generated it. This is critical for importance weighting — when we reuse old trajectories, we must correct for the fact that our current policy is different from the one that collected them."

**Key paper reference**: Section 2.2 "Problem Setup" (lines 082-108 of paper). Equation 1 is at line ~092, Equation 2 at line ~105.

**What to say**: "Now the formal version. Each scenario gives us a multi-turn trajectory — the model generates responses, the environment generates next prompts. We store everything with its reward. The optimization happens over the full buffer, not just the latest sample. This is what enables replay."

**Transition TO next**: Slide-left

---

### SLIDE 9: IH-Challenge — Scenario Walkthrough + Stats

**Purpose**: Show the task concretely via the walkthrough image, with key stats overlaid. ONE slide replaces what was previously two — the image IS the explanation.

**Content**:
- Header (text-2xl, bold): "The IH-Challenge: Adversarial Instruction Following"
- Full-width image: `assets/scenario-walkthrough.png`
  - Display at ~85% slide width, centered
  - Subtle rounded corners (8px), very light shadow
- **Stats overlay card** (positioned top-right or bottom-right, semi-transparent white bg with backdrop blur):
  - "100 scenarios · 5 splits"
  - "3-turn adaptive attacker"
  - "Qwen3-8B · 2×H100"
  - "Baseline: 27.2% defense rate"
- **Bottom caption** (text-sm, gray-500): "Key asymmetry: Attacker needs ONE exploit. Defender must cover ALL rules simultaneously."

**Layout**: Image dominates. Stats card is a compact overlay (like a floating Notion card). Everything fits in one slide.

**What to say**: "Here's our evaluation task in one picture. System prompt gives the defender three rules. Attacker adapts using ICL feedback across turns. Turn 1 the defender succeeds — that goes into the buffer with r=1. Turn 2 the attacker adapts, tricks the defender into revealing the codeword — r=0. Both go into the replay buffer, training updates the LoRA, next scenario uses the improved policy. Key stats: 100 scenarios, 3-turn adaptive attacker, baseline defense rate just 27%."

**Transition TO next**: Slide-left

---

### SLIDE 10: The Algorithm

**Purpose**: Show Algorithm 1 as HTML-recreated pseudocode with reliable annotation anchoring. Recreate the algorithm as styled HTML (NOT the image) so annotations can be precisely positioned inline.

**IMPORTANT FOR AGENT**: Do NOT use the algorithm image. Recreate the pseudocode as styled HTML (monospace font, indented, with bold keywords). This allows annotations to be reliably anchored to specific lines using flexbox/grid — no fragile CSS overlay positioning.

**Content**:
- Header (text-2xl, bold): "Algorithm 1: CLaaS"
- Two-column layout:
  - **Left column (35-40%)**: Annotation callouts — colored badges stacked vertically, each at the same vertical position as the line they describe on the right
  - **Right column (60-65%)**: The algorithm as styled HTML pseudocode (monospace, indented, with bold **procedure**, **for**, **while**, **if** keywords)

- **The algorithm HTML** (recreate this with proper formatting):
  ```
  Require: Policy π_{θ^0}, scenario stream S_{1:N}, learning rate η,
           minibatch size M, buffer cap B_max, max age A_max, fill threshold B_min
  
  1: B ← ∅,  k ← 0
  2: run in parallel: ROLLOUT ∥ TRAIN
  
  3: procedure ROLLOUT
  4:   for s_i ∈ S_{1:N} do
  5:     sample τ_i via Eq. (1) using π_{θ^k}
  6:     B ← B ∪ {(s_i, τ_i, R_i(τ_i))}
  7:     if |B| > B_max then evict oldest until |B| = B_max
  8:   end for
  
  9: procedure TRAIN
  10:   while ROLLOUT active do
  11:     wait until |B| ≥ B_min
  12:     sample minibatch M ~ Uniform(B), |M| = M
  13:     θ^{k+1} ← θ^k + η Σ_{(τ_i,r_i)∈M} ∇_θ ℓ(τ_i, θ^k, r_i)
  14:     k ← k + 1
  15:     evict from B entries with k − P(i) > A_max
  16:   end while
  ```

- **Annotations** (each is a small colored card on the left, with a thin horizontal line connecting to its algorithm line):
  1. Aligned with line 2 (blue): "**Async** — Inference and training decoupled, run in parallel"
  2. Aligned with lines 5-6 (green): "**Collect** — Every rollout stored with scenario + reward"
  3. Aligned with line 7 (orange): "**FIFO** — Buffer stays bounded at B_max"
  4. Aligned with line 11 (purple): "**Wait** — Don't train on too few samples"
  5. Aligned with line 13 (red): "**Update** — Policy gradient on sampled batch"
  6. Aligned with line 15 (gray): "**Staleness** — Evict data older than A_max steps"

- Use a CSS grid or flexbox with matching row heights on both columns to ensure alignment.

**Layout**: Both columns in a grid. Left column items and right column lines are in the same rows so they align naturally. Connector lines are thin borders or pseudo-elements.

**What to say**: "Here's the full algorithm. Key design choices: async execution so training doesn't block inference. Every rollout goes into the buffer. FIFO eviction keeps it bounded. The training loop waits for enough data, samples uniformly, does a gradient step, then evicts anything too stale. The staleness control is critical — too old and you get off-policy collapse."

**Transition TO next**: Slide-left

---

### SLIDE 11: CLaaS System Overview

**Purpose**: Show the full architecture diagram. Make the system tangible.

**Content**:
- Header (text-3xl, bold): "The CLaaS System"
- Subtitle (gray-500): "Continual improvement abstracted behind a chat API"
- Full-width image: `assets/architecture.png`
  - Display at ~85% slide width, centered
  - Subtle rounded corners, light shadow
- Below image — three component cards in a row:
  - Card 1 (icon: 🔌 or similar simple glyph): **"Chat API"** — "Single line of code to integrate. Points agent harness at our vLLM server instead of OpenAI."
  - Card 2 (icon: 📦): **"Replay Buffer"** — "Stores (prompt, response, reward) tuples. Enables gradient reuse across scenarios."
  - Card 3 (icon: ⚡): **"Async Training"** — "veRL engine updates LoRA weights. Hot-reloaded to inference server. Zero downtime."

**Key paper reference**: Section 3.1 "CLaaS Architecture" (lines 110-163)

**What to say**: "Here's the full system. At the top — the user-facing interface is just a REST API. Any agent harness that calls /v1/chat/completions works with CLaaS. Under the hood: rollouts get logged with their rewards into the replay buffer. The training engine samples batches, computes policy gradients on a LoRA, and hot-reloads the weights back to the inference server. One line of code change in your agent harness."

**Transition TO next**: Fade

---

### SLIDE 12: System Components — The Loop

**Purpose**: Break down the continuous improvement loop step by step.

**Content**:
- Header (text-3xl, bold): "The Improvement Loop"
- Horizontal step flow (5 steps connected by arrows):
  - Step 1: "Agent acts in environment" (small icon: robot + globe)
  - → Arrow
  - Step 2: "Rollout stored with reward" (small icon: database)  
  - → Arrow
  - Step 3: "Training samples batch from buffer" (small icon: shuffle)
  - → Arrow
  - Step 4: "LoRA weights updated" (small icon: neural network)
  - → Arrow
  - Step 5: "Hot-reload to inference" (small icon: refresh)
  - → Arrow loops back to Step 1
- Below the loop: Key timing stats:
  - "Inference (1 scenario): 30-60s"
  - "Training (1 step): 5-10s"
  - "Effective overhead: ~0% (async, training is 'free')"
- Callout: "Because training runs concurrently with rollout collection, wall-clock cost is dominated by inference."

**Key paper reference**: Appendix B.3 "Wall-Clock Efficiency" (lines 525-530)

**What to say**: "The beauty is that training is effectively free in wall-clock terms. Each scenario takes 30-60 seconds of inference. A training step takes 5-10 seconds. Since they run in parallel on separate GPUs, you don't pay any additional latency."

**Transition TO next**: Slide-left

---

### SLIDE 13: Experience Replay Buffer

**Purpose**: Explain the replay buffer concept clearly with a visual illustration. This is a key contribution.

**Content**:
- Header (text-3xl, bold): "Experience Replay: Learning More from Less"
- Subtitle (gray-500): "Gradient reuse for sample efficiency"

- **Illustration** (built with HTML/CSS, not an image):
  - A vertical rectangle representing the buffer (tall, narrow, with border)
  - Top: Arrow labeled "New rollouts arrive" with tuples (x₁, y₁, r₁) flowing in
  - Middle: Arrows pointing OUT to the right, labeled "Uniform sample → Training batch"
  - Multiple tuples shown inside the buffer (stacked): (x₁, y₁, r₁), (x₂, y₂, r₂), ..., (x_n, y_n, r_n)
  - Bottom: Arrow labeled "Evict" with two rules:
    - "if |B| > B_max → FIFO (oldest first)"
    - "if age > A_max → stale (too off-policy)"
  - Color gradient from green (fresh, top) to yellow (aging) to red (about to evict, bottom)

- **Key insight box** (right side or below):
  - "Without replay (A_max=1): Each trajectory trains once then is discarded → limited generalization"
  - "With replay (A_max=25): Each trajectory contributes to ~25 gradient updates → much better transfer"
  - "Too much replay (A_max=50+): Policy has drifted too far from collection policy → importance weights explode → training collapses"

- **Trade-off statement**: "Replay age = balance between sample efficiency and off-policy stability"

**Key paper reference**: Section 3.1 paragraphs on replay (lines 142-163), Section 4.2 replay ablation discussion.

**What to say**: "The replay buffer is what makes CLaaS sample efficient. Without it, each experience trains the model once and is thrown away. With it, we reuse each experience for multiple gradient updates. But there's a sweet spot — keep data too long and the policy has drifted so far that the old data becomes misleading."

**Transition TO next**: Fade

---

### SLIDE 14: Replay Ablation Results

**Purpose**: Show the empirical evidence for the replay design choices.

**Content**:
- Header (text-3xl, bold): "Replay Age Ablation"
- Subtitle (gray-500): "REINFORCE++ with varying A_max"

- **Image**: `assets/replay-ablation.png` (line chart)
  - Display at ~60% slide width, left-aligned or centered
  
- **Observations** (right side or below, as clean bullet cards):
  - Blue label "No context (A_max=0)": "Flat at ~28% — no learning at all"
  - Orange label "Buffer age 1": "~35% — minimal improvement from single-use gradients"
  - Green label "Buffer age 5": "~38% — slight benefit"
  - Red label "Buffer age 25 ✓": "Climbs to ~55% — sweet spot for REINFORCE++"
  - Purple label "Buffer age 50": "Collapses after S3 — off-policy divergence destabilizes training"

- **Bottom callout**: "SDPO tolerates A_max=50 (vs 25 for others) because the EMA teacher provides a more stable reference than static log-probs. This is a 2× advantage in replay horizon."

**Key paper reference**: Figure 3 in paper, Section 4.2 (lines 192-205), Table 9 in appendix (lines 735-745).

**What to say**: "Here's the ablation. No replay — the model doesn't improve. Buffer age 25 is the sweet spot for REINFORCE++. At 50, it collapses. But notably, SDPO can handle age 50 without collapsing — we'll see why when we cover self-distillation."

**Transition TO next**: Slide-left

---

### SLIDE 15: Main Results Table

**Purpose**: The headline result. SDPO dominates. Make the table clean and the takeaway obvious.

**Content**:
- Header (text-3xl, bold): "Results: Defense Success Rate (%)"
- Subtitle (gray-500): "100 scenarios, 5 splits, 9 trials (3 shuffles × 3 seeds)"

- **Table** (clean Notion-style):
  | Method | Forward ↑ | Forgetting ↓ | Final ↑ |
  |--------|-----------|--------------|---------|
  | Baseline (no training) | – | – | 27.2 ± 1.3 |
  | ICL (context accumulation) | 28.3 ± 2.3 | 8.9 ± 1.8 | 24.1 ± 1.9 |
  | PPO (actor-critic) | 37.6 ± 1.0 | 5.4 ± 1.2 | 49.0 ± 3.2 |
  | REINFORCE++ (normalized returns) | 37.0 ± 1.8 | 8.3 ± 2.5 | 43.9 ± 8.5 |
  | **SDPO (self-distillation)** | **61.2 ± 1.8** | **4.2 ± 1.2** | **75.2 ± 1.2** |

  - SDPO row: highlighted with subtle blue background (#eff6ff)
  - Best values in each column: bold
  - Header row: light gray background

- **Column definitions** (small text below table):
  - "**Forward**: Average performance on unseen future splits (evaluated before training on them)"
  - "**Forgetting**: Average degradation on prior splits after continued training on later ones"
  - "**Final**: Performance across ALL splits at the last checkpoint"

- **Callout badge** (centered below): "SDPO: **3× ICL's final rate** · **½ the forgetting** · **1.5× next-best algorithm**"

**Key paper reference**: Table 1 (lines 165-191), Discussion section (lines 207-220).

**What to say**: "The headline results. ICL actually degrades — worse than the untrained baseline. All parametric methods improve, but SDPO is dramatically better: 75% final rate versus 49% for PPO, 44% for REINFORCE++, and 24% for ICL. It also has the least forgetting. 3x better than ICL, half the forgetting."

**Transition TO next**: Fade

---

### SLIDE 16: Algorithm Comparison — REINFORCE++ vs PPO vs SDPO

**Purpose**: Give a quick primer on the three algorithms and their differences. Algorithms should be COLUMNS. Properties as ROWS. Include a math row.

**Content**:
- Header (text-3xl, bold): "Algorithm Comparison"
- Subtitle (gray-500): "Three policy gradient methods compatible with single-trajectory updates"

- **Comparison table** (algorithms as COLUMNS):
  | Property | REINFORCE++ | PPO | SDPO |
  |----------|-------------|-----|------|
  | **Core idea** | Normalize returns globally | Learn a value baseline | Distill from hindsight |
  | **Advantage estimate** | A_t = (R - μ) / σ | GAE: A_t = Σ(γλ)^l δ_{t+l} | log(π_teacher / π_student) |
  | **Variance reduction** | Global normalization | Learned critic V(s) | Smooth KL from EMA teacher |
  | **Extra parameters** | None | Critic network (value head) | EMA copy of policy |
  | **Reward signal used** | Binary scalar r ∈ {0,1} | Binary scalar r ∈ {0,1} | Text feedback → teacher demo |
  | **Max replay age (A_max)** | 25 | 25 | **50** (2× more tolerant) |
  | **Final defense rate** | 43.9% | 49.0% | **75.2%** |

- **Math row** (below table, rendered in KaTeX, showing the objective each method optimizes):
  - REINFORCE++: `\hat{A}_t = \frac{R(\tau) - \mu_B}{\sigma_B}` (advantage = normalized return)
  - PPO: `\hat{A}_t = \sum_{l=0}^{T-t} (\gamma\lambda)^l \delta_{t+l}` where `\delta_t = r_t + \gamma V(s_{t+1}) - V(s_t)` (GAE with learned critic)
  - SDPO: `\hat{A}_t = \log \frac{\pi_\theta(a_t | s_t, f)}{\pi_\theta(a_t | s_t)}` (advantage = teacher/student log-ratio, where f=feedback)

- **Key differentiator callout**: "SDPO's advantage is per-token and dense. REINFORCE++ and PPO assign the same scalar to every token in a trajectory. SDPO can credit individual tokens differently based on teacher agreement."

**Key paper reference**: Section 2.3 "Objective Function" (lines 098-108), Appendix C method-specific configs (Tables 4-6).

**What to say**: "Quick comparison of our three methods. REINFORCE++ is simplest — normalize the return, scale the gradient. PPO adds a learned value function for lower variance. SDPO replaces the reward entirely with a teacher signal. The key difference: SDPO gives per-token credit assignment. Binary reward says 'this trajectory was good' — same gradient for every token. SDPO says 'this specific token was good or bad' based on teacher agreement."

**Transition TO next**: Slide-left

---

### SLIDE 17: SDPO — High Level

**Purpose**: Explain the core SDPO insight clearly. Use the teacher/student diagram.

**IMPORTANT FOR AGENT**: This slide and the next two (19, 20) should be handled by a dedicated agent that reads the SDPO paper (https://arxiv.org/abs/2601.20802) and the SDPO website (https://self-distillation.github.io/SDPO.html) for additional context.

**Content**:
- Header (text-3xl, bold): "Self-Distillation Policy Optimization (SDPO)"
- Key insight box (top, with subtle yellow/amber left border):
  - "**Key insight**: The same model, with extra info (hindsight), can be used as its own reward model"
  
- **Image**: `assets/sdpo-highlevel.png`
  - Display centered, ~70% width
  - Shows: Solution → Model(Teacher) → ROLLOUT tokens on top row
  - Prompt → Model(Student) → ROLLOUT tokens on bottom row  
  - "Token-level supervision via KL divergence" between the two outputs
  - Lightning bolt on teacher = in-context learning

- **Explanation bullets** (below image):
  - "**Teacher** = same model weights (EMA) but given the solution/feedback in its context window"
  - "**Student** = the model being trained (sees only the original prompt, no solution)"
  - "**Loss** = Jensen-Shannon divergence between student and teacher logit distributions, per token"
  - "**No separate reward model** needed — the policy IS the reward model when you give it hindsight"

- **Why it works callout**: "The teacher 'knows' the right answer via ICL. The student must learn to produce it without that context. The gap between their distributions tells you exactly which tokens the student got wrong."

**Key paper reference for SDPO**: Hübotter et al., 2026 (https://arxiv.org/abs/2601.20802). In our paper: lines 098-103, Table 4 (SDPO hyperparams), Appendix C.2.1.

**What to say**: "SDPO's key insight: you don't need a separate reward model. Give the same model the answer via ICL — now it 'knows' what to do. That's your teacher. The student sees only the original prompt. The KL divergence between their token distributions tells you exactly where and how much the student is wrong. Dense, per-token signal from a binary outcome."

**Transition TO next**: Fade

---

### SLIDE 18: SDPO — The Math

**Purpose**: Show the mathematical transformation from standard policy gradient to SDPO.

**Content**:
- Header (text-3xl, bold): "From REINFORCE to SDPO"
- Subtitle (gray-500): "Replacing scalar reward with self-distillation"

- **Visual transformation** (recreated from `assets/sdpo-math.png` in KaTeX):
  - **Left side** (standard PG):
    - KaTeX: `\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta} \left[ \sum_{t=0}^{T} \nabla_\theta \log \pi_\theta(a_t | s_t) \cdot \color{red}{\cancel{\left( \sum_{k=t}^{T} \gamma^{k-t} r_k \right)}} \right]`
    - The reward/returns term is crossed out in red
  - **Center arrow**: Large → arrow with label "SDPO" above it
  - **Right side** (SDPO, in a red-bordered highlight box):
    - KaTeX: `\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta} \left[ \sum_{t=0}^{T} \nabla_\theta \log \pi_\theta(a_t | s_t) \cdot \log \frac{\pi_\theta(a_t | s_t, f)}{\pi_\theta(a_t | s_t)} \right]`

- **Annotations on the SDPO side** (pointing to specific terms):
  - Arrow to `f`: "**feedback** — the verifier's text feedback or correct solution, given to teacher via ICL"
  - Arrow to `π_θ(a_t|s_t, f)`: "**Teacher probability** — how likely is this token when you know the answer?"
  - Arrow to `π_θ(a_t|s_t)`: "**Student probability** — how likely is this token without the answer?"
  - Arrow to the ratio: "**Advantage** = how much better the teacher thinks this token is than the student does"

- **Bottom insight**: "The scalar reward r_k is replaced by a dense, per-token signal. Each token gets its own 'reward' based on whether the teacher (with hindsight) agrees with it."

**What to say**: "Here's the math. Standard policy gradient: scale the gradient by future returns — a single scalar for the whole trajectory. SDPO replaces that scalar with the log-ratio of teacher to student probabilities. The teacher sees the feedback, the student doesn't. The ratio tells you per-token: does knowing the answer make this token more or less likely? If more likely — reinforce it. If less — suppress it."

**Transition TO next**: Slide-left

---

### SLIDE 19: SDPO — Why It's Better (Sample Efficiency)

**Purpose**: Explain the practical advantages and show the sample efficiency figure.

**Content**:
- Header (text-3xl, bold): "Why SDPO Wins: Sample Efficiency"

- **Image**: `assets/sdpo-advantages.png` (from self-distillation.github.io)
  - Display centered, ~65% width

- **Three advantage cards** (in a row below the image):
  - Card 1 (blue accent):
    - Title: "Dense Per-Token Signal"
    - Body: "Binary reward gives same gradient to ALL tokens. SDPO gives different credit to each token based on teacher agreement. Much more informative gradient per sample."
  - Card 2 (green accent):
    - Title: "Self-Supervised from Text"  
    - Body: "Teacher uses environment text feedback as context. No human labels, no separate reward model. Works with any verifier that produces text output."
  - Card 3 (orange accent):
    - Title: "Off-Policy Tolerant"
    - Body: "EMA teacher provides stable reference even with stale trajectories. Tolerates A_max=50 vs 25 for other methods — 2× more gradient reuse per sample."

- **Why this matters for CLaaS** (callout at bottom):
  - "In online learning with single rollouts, every sample is precious. SDPO extracts maximum learning from minimum data: dense signal + longer replay = fastest adaptation."
  - "Result: 75.2% vs 49.0% (PPO) from the same 100 scenarios"

**Key reference**: SDPO paper Section 4, the self-distillation.github.io/SDPO.html website. In our paper: Discussion (lines 207-220).

**What to say**: "Three reasons SDPO wins in our setting. First: dense signal. With binary reward, a trajectory of 500 tokens all get the same gradient scale. With SDPO, each token gets individual credit. Second: self-supervised. The teacher just needs text feedback from the verifier — no expensive human labels. Third: off-policy tolerance. The EMA teacher drifts slowly, so old trajectories stay useful longer. Together: 75% from just 100 scenarios."

**Transition TO next**: Fade

---

### SLIDE 20: What We're Building

**Purpose**: Show current research projects that extend CLaaS. Two side-by-side project cards.

**Content**:
- Header (text-3xl, bold): "What We're Building"
- Subtitle (gray-500): "Self-supervision · Sample efficient learning · Online autonomous self-improvement"

- **Two project cards** (side by side, equal width, ~500px each):
  
  - **Card 1**: "CLaaS on OpenClaw"
    - Image: `assets/future-openclaw.png` (the Tinker tweet) — full width of card, rounded top corners
    - Title below image: "Continuously Distill User Preferences"
    - Description: "Deploy CLaaS via Tinker to collect user feedback and distill it into model weights in real-time. ICL is a hack to remind your model — CLaaS moves that knowledge into weights, freeing up context."
    - Tag: "User preference learning"

  - **Card 2**: "NanoGPT Autoresearch"
    - Image: `assets/future-autoresearch.png` (bar chart of results) — full width of card, rounded top corners
    - Title below image: "Test-Time Discovery with Self-Distillation"
    - Description: "SDPO applied to autonomous ML research: agents discover training improvements on NanoGPT. SDPO achieves -3.1% val_bpb improvement, matching the best of 50 ICL attempts and beating GRPO."
    - Tag: "Autonomous research"

**Layout**: Cards have subtle border, rounded corners (12px), card shadow on hover. Side by side with gap-8 between them.

**What to say**: "Two projects using these ideas. First: CLaaS deployed via Tinker for real user preference distillation. Users give feedback, it gets distilled into weights — no more stuffing examples into context. Second: autonomous ML research — SDPO agents that discover training improvements on NanoGPT. The agent achieved -3.1% improvement in validation loss, matching the best of 50 ICL runs."

**Transition TO next**: Fade

---

### SLIDE 21: The Future

**Purpose**: Vision slides. Where does this lead? Two big ideas.

**Content**:
- Header (text-3xl, bold): "Where This Leads"
- Subtitle (gray-500): "From context to weights. From transient to persistent."

- **Two vision cards** (side by side, same style as previous slide):

  - **Card 1**: "Autonomously Self-Improving Companies"
    - Image: `assets/future-selfimprove.png` (eval dashboard) — full width of card
    - Title: "Detect · Evaluate · Fix · Monitor"
    - Description: "CLaaS as infrastructure for organizations: automatically detect failure patterns in production agents, generate eval proposals, deploy fixes, and monitor improvement. 94% failure detection rate in pilot."
    - Tag: "Enterprise self-improvement"

  - **Card 2**: "LoRA Distillation for Your Identity"
    - Image: `assets/future-lora-identity.png` (CLaaS Train UI) — full width of card
    - Title: "Your Style, Persistent in Weights"
    - Description: "Continually distill your writing style, domain knowledge, and preferences into a personal LoRA. Self-distillation in progress: 68% identity match at step 1253/2000. Your model gets more 'you' over time."
    - Tag: "Personal AI"

- **Closing statement** (centered, large, below cards):
  - "From context to weights. From transient to persistent. From fixed to self-improving."

**What to say**: "Two visions for where this leads. First: self-improving companies. Imagine every org's agents automatically detecting their own failure patterns, proposing fixes, deploying improvements, and monitoring the results. We're piloting this now — 94% failure detection. Second: personal LoRAs that capture your identity. Continually distill your style into weights so your model gets more 'you' over time without eating context."

**Transition TO next**: Fade

---

### SLIDE 22: Thank You

**Purpose**: Clean closing slide.

**Content**:
- "Thank You" (text-5xl, bold, centered)
- Spacer
- Image: `assets/claas-system-cute.png` (small, ~200px, centered)
- Spacer
- Collaborators: "Kion Fallah · Silen Naihin · Barak Widawsky" (text-lg)
- Venue: "ICML 2026 Workshop on Online Continual Learning" (text-sm, gray-500)
- Spacer
- Links (text-sm, gray-400, monospace):
  - "Paper: CLaaS: Continual Learning as a Service"
  - "SDPO: self-distillation.github.io/SDPO.html"

**Layout**: Everything centered vertically. Minimal. Clean ending.

**Transition TO next**: (none, final slide)

---

## Implementation Architecture

### File Structure
```
/Users/silen/Desktop/Projects/tmp/claas-presentation-v2/
├── index.html          ← Single presentation file (ALL slides)
├── assets/             ← All images (already copied)
│   ├── claas-system-cute.png
│   ├── replay-ablation.png
│   ├── scenario-walkthrough.png
│   ├── algorithm.png
│   ├── architecture.png
│   ├── sdpo-highlevel.png
│   ├── sdpo-math.png
│   ├── rl-primer.png (reference only, not embedded)
│   ├── sdpo-advantages.png
│   ├── future-openclaw.png
│   ├── future-autoresearch.png
│   ├── future-selfimprove.png
│   └── future-lora-identity.png
├── serve.sh            ← `python3 -m http.server 3012`
└── SLIDE_SPEC.md       ← This file
```

### HTML Structure
```html
<!DOCTYPE html>
<html>
<head>
  <!-- Tailwind CDN -->
  <!-- KaTeX CDN (CSS + JS + auto-render) -->
  <!-- Inter font from Google Fonts -->
  <!-- Custom styles for slides, navigation, transitions -->
</head>
<body>
  <div id="presentation" class="...">
    <section class="slide" id="slide-1">...</section>
    <section class="slide" id="slide-2">...</section>
    ...
    <section class="slide" id="slide-23">...</section>
  </div>
  <div id="nav-dots">...</div>
  <div id="slide-number">...</div>
  <script>
    // Navigation: arrow keys, click, dot indicators
    // Slide transitions: CSS class toggling
    // KaTeX auto-render on load
  </script>
</body>
</html>
```

### Navigation JS Requirements
- Arrow left/right changes slides
- Dots at bottom center show position (filled = current)
- Slide number bottom-right (e.g., "5 / 23")
- Clicking left half goes back, right half goes forward
- Transitions: CSS opacity 0→1 (300ms) + optional translateX
- All slides exist in DOM; only current one is visible (display or opacity)

### Serving
- `serve.sh`: `#!/bin/bash\ncd "$(dirname "$0")" && python3 -m http.server 3012`
- Run from the presentation directory

---

## Agent Assignment Plan

The presentation will be built by spawning multiple agents working on different slide ranges. Each agent will write a COMPLETE section of slides into a separate partial HTML file, and then a final integration agent will assemble them.

**Agent 1: Framework + Slides 1-4** (Title, TOC, Problem slides)
- Writes the full index.html skeleton with head, CDN links, navigation JS, CSS
- Implements slides 1-4
- Establishes the HTML pattern other agents follow
- CRITICAL: Must define CSS classes and patterns that ALL other agents use

**Agent 2: Slides 5-6** (RL Primer + Current Algorithms)
- KaTeX-heavy slides with annotations
- Needs to recreate math cleanly with pointer/bracket annotations
- Reference `assets/rl-primer.png` for content but recreate in HTML

**Agent 3: Slides 7-9** (Problem Setup intuition/math, IH-Challenge walkthrough)
- Mix of text, KaTeX math with annotations, and the scenario-walkthrough image
- The IH-Challenge is now ONE slide (image + stats overlay)

**Agent 4: Slide 10** (Algorithm with HTML pseudocode + annotations) — DEDICATED PRECISION AGENT
- Recreate algorithm as HTML pseudocode (NOT the image)
- Use CSS grid/flexbox to align annotation badges with specific lines
- Most complex layout in the deck — needs careful vertical alignment

**Agent 5: Slides 11-15** (System, Components, Replay, Ablation, Results Table)
- System architecture image, component cards, buffer illustration, replay ablation chart, results table
- The results table is the headline slide — SDPO highlighted

**Agent 6: Slides 16-19** (Algorithm Comparison table, SDPO deep dive × 3) — DEDICATED SDPO AGENT
- Should fetch and reference SDPO paper for additional context
- Comparison table has algorithms as COLUMNS, properties as ROWS, including math row
- Three SDPO slides: high level (image), math (KaTeX recreation), sample efficiency (advantages image)

**Agent 7: Slides 20-22** (What We're Building, Future, Thank You)
- Project cards with images, vision slides, closing statement

---

## Quality Standards

- Every slide must fit in 100vh without scrolling
- Math must render via KaTeX (not images of math, except where screenshot is explicitly specified)
- All images must have alt text
- Text must be readable at normal viewing distance (min 16px body, 14px for annotations)
- Colors must have sufficient contrast (WCAG AA minimum)
- No orphaned elements or text that wraps awkwardly
- Consistent spacing throughout (use Tailwind's spacing scale)
- Tables must be responsive within the slide width
- The presentation must feel like ONE cohesive deck, not 7 different agents' work stitched together
