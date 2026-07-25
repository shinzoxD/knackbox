# Why Knackbox (vs skills.sh)

You do not need another popularity contest. You need skills you can **trust**,
**measure**, and **ship** without guessing.

## The problem with install-count leaderboards

[skills.sh](https://www.skills.sh/) is excellent at **discovery**: thousands of
packages, trending charts, one-command install into many agents.

Install counts answer: *“What did people download?”*  
They do **not** answer:

- Does it trigger at the right time?  
- Does it improve outputs vs no skill?  
- Is the package still maintained?  
- What network/filesystem rights does it declare?  
- Did anyone review the benchmark suite?

A viral skill can still be vague, stale, or unsafe.

## What Knackbox does differently

### 1. Quality bar before merge

Every skill is reviewed against the [Knackbox Standard](STANDARD.md):

- Trigger-first descriptions  
- Real workflows and edge cases  
- Mandatory benchmark suites  
- Permission + security metadata  

### 2. Honest leaderboard

Our catalog ranks by **tier** and **measured columns** (trigger F1, uplift,
efficiency). Until a skill is measured, scores show **—** — we never invent
numbers to look complete.

Methodology: [METRICS.md](METRICS.md) · Protocol: [EVALUATION.md](EVALUATION.md)

### 3. Trust you can audit

Each package publishes a **content digest**, license, security profile, and
permission expectations in `catalog.json`. Compare digests after upgrades.

### 4. Packs for jobs, not random shopping

Starter packs install coherent workflows (engineering, ops, research, GTM)
instead of a single viral one-liner.

### 5. Compatible — not captive

```bash
# Ecosystem CLI (skills.sh world)
npx skills add shinzoxD/knackbox --skill commit-messages -y

# Knackbox CLI (packs, search, doctor, multi-agent)
npx knackbox add commit-messages
npx knackbox pack developer-essentials
npx knackbox search security
npx knackbox doctor
```

Same open `SKILL.md` format. Better curation and evidence on top.

## Side-by-side

| Dimension | skills.sh | Knackbox |
|---|---|---|
| Discovery | Ecosystem-wide search & trends | Focused catalog + search |
| Ranking | Installs / activity | Tier + benchmarks + metrics |
| Quality gate | Repo author’s choice | CI validate + review standard |
| Benchmarks | Optional / rare | **Required** for every skill |
| Metrics honesty | N/A (popularity) | Null until measured |
| Trust metadata | Varies by package | Digest, permissions, security profile |
| Job install | Per skill / repo | **Packs** + recipes |
| Scope | Everything on GitHub with skills | Curated, opinionated library |

## How we win (roadmap of advantages)

1. **Measured core** — publish real trigger/uplift scores for core skills  
2. **Trust UI** — digest, permissions, suite coverage always visible  
3. **Multi-agent install** — one command → Claude, Cursor, Codex, …  
4. **Standard others adopt** — “Knackbox-grade” as a quality label  
5. **Stay compatible** — never break `npx skills add`  

## When to use each

| Use skills.sh when… | Use Knackbox when… |
|---|---|
| You want a niche stack skill (Azure, Lark, Remotion) | You want general engineering/writing/ops quality |
| You are browsing trends | You need tiers, digests, and suites |
| You install from many random repos | You want one reviewed library + packs |

**Best setup for most people:** Knackbox as the default toolkit + selective
skills.sh packages for vendor-specific work.

## Try the difference

```bash
npx knackbox list --sort tier
npx knackbox doctor
npx knackbox pack developer-essentials
```

Site: [knackbox.pages.dev](https://knackbox.pages.dev) · Why page: [/why/](https://knackbox.pages.dev/why/)
