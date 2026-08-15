---
name: frontend-performance
description: Implement frontend performance — Core Web Vitals (LCP, INP, CLS),
  bundle size, code splitting, image optimization, hydration, and request
  waterfalls. Use whenever the user mentions Lighthouse, slow page load, LCP,
  INP, CLS, long tasks, TTFB for pages, or asks to shrink JS / split routes.
  For server, CPU, or DB profiling, use performance-review instead.
license: Apache-2.0
compatibility: Portable instructions; may interpret Lighthouse/Web Vitals traces when provided.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Frontend Performance

Ship browser-side speed. Measure Core Web Vitals, then implement the
change that moves the **dominant** one. This is not a general app profile.

Server CPU, p95 APIs, N+1 queries, and DB plans belong in
`performance-review`. Stay on LCP, INP, CLS, waterfalls, images,
bundles, and hydration.

## Workflow

1. **Name the surface and the goal vital.** Route or template, device
   class, and which of LCP / INP / CLS (or a JS-byte budget) is the SLO.
2. **Gather evidence.** Prefer field (CrUX/RUM) over one lab run. Use a
   Lighthouse report, Perf-panel waterfall, long-task profile, or bundle
   analyzer when given. If none, prescribe the cheapest measurement first.
3. **Own the dominant vital.** Name the LCP element, the long task or
   handler, the shifting node, or the blocking request. One owner.
4. **Implement the highest-impact browser change.** Typical: priority +
   dimensions on the LCP image (never `loading="lazy"` on it), route-level
   `import()`, defer non-critical JS, shrink the hydration surface, reserve
   space, font-display with fallback metrics.
5. **Verify the same vital** on the same device class. Do not pivot to a
   vanity Performance score.

## Common owners

| Symptom | Often the owner |
|---|---|
| Bad LCP | late hero, render-blocking CSS/JS, webfont, HTML TTFB |
| Bad INP | long tasks, sync hydration, heavy click/input handlers |
| Bad CLS | unsized media, injected banners, font swap, late ads |
| Huge JS | no route split, unused deps, SSR + client duplicate |
| Slow first paint | blocking CSS/JS, long critical request chain |

## Output format

```markdown
## Frontend performance: <route or page>

**Goal vital / budget:** …
**Evidence used:** … (or: measurements to collect first)
**Field vs lab:** …

### Dominant bottleneck
Vital + owning element/request/script + confidence (low/med/high)

### Implementation
1. [high impact] … — expected effect, a11y impact, how to verify
2. …

### Do not do yet
Micro-opts and score theater that miss the owner.

### Verify
Same vital, same device class; what must not regress (a11y, SEO).
```

## Rules

1. Never invent Lighthouse scores, CrUX percentiles, or byte sizes.
2. Measure, then fix **one** dominant Web Vital before a laundry list.
3. Never drop `alt`, focus rings, skip links, captions, or
   `prefers-reduced-motion` to save milliseconds.
4. Never claim a speedup percentage except as a labeled estimate.
5. If HTML TTFB or the API is the owner, say so and hand origin CPU/DB
   to `performance-review`; still name the page vital it hurts.
6. Prefer `width`/`height` or `aspect-ratio`, `srcset`/`sizes`, and
   fetch priority over custom lazy-load scripts.
7. Do not hide content with `display: none` or off-screen hacks that
   break keyboard, AT, or SEO and call it a win.
8. Distinguish lab (Lighthouse) from field (CrUX/RUM); prefer field
   when they disagree.

## Edge cases

- **No trace or Lighthouse:** give a 3-step recipe (field vital →
  waterfall → long tasks / coverage) before rewrites.
- **Backend-bound page:** TTFB or API waterfalls → `performance-review`
  for the origin; do not pretend a `useMemo` will fix SQL.
- **SSR / hydration:** ship less client JS; do not hydrate static
  trees; do not flash a non-keyboard first paint.
- **"Make Lighthouse 100":** refuse score chasing; pick the failing
  vital and a real budget (e.g. LCP under 2.5s on mid-tier mobile).
- **Images vs CLS:** never strip dimensions to “make it load faster.”
