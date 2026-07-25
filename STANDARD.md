# The Knackbox Standard

skills.sh answers: **what is popular?**  
Knackbox answers: **what is good, safe, and measurable?**

Every first-party skill in this repository must meet the bar below before merge.
Popularity is useful marketing; it is not a quality signal.

## 1. Format & discovery

| Requirement | Why |
|---|---|
| Valid `SKILL.md` with `name` + trigger-oriented `description` | Agents under-trigger without pushy *when* language |
| Path `skills/<category>/<name>/` matching `name` | Predictable installs for every CLI |
| Compatible with `npx skills add shinzoxD/knackbox` | Ecosystem interoperability |
| No secrets, credentials, or personal data | Safety |

## 2. Instruction quality

| Requirement | Why |
|---|---|
| Concrete workflow, rules, edge cases | Generic advice is not a skill |
| Output template agents can copy | Consistent results |
| Progressive disclosure (`references/`) when long | Context efficiency |
| Declared permissions (`network` / `filesystem` / `execution`) | Trust before install |

## 3. Benchmark suite (mandatory)

Every skill ships `benchmarks/prompts.json` with:

- ≥ 5 realistic `should_trigger` prompts  
- ≥ 5 near-miss `should_not_trigger` prompts  
- ≥ 3 tasks with **observable** criteria  

Suites are reviewed like code. Trivial “always pass” fixtures are rejected.

## 4. Measurement path (optional → Verified)

Published scores require the protocol in [EVALUATION.md](EVALUATION.md):

- Trigger F1 and quality uplift via blind pairwise grading  
- Raw outputs + content digest for audit  
- Human review before promotion  

| Tier | Meaning |
|---|---|
| 🧪 **community** | Passes CI validation (default) |
| ✅ **verified** | Suite + measurements meet thresholds |
| ⭐ **core** | Verified + maintainer-curated + fresh |

## 5. Trust metadata (published in catalog.json)

Every catalog entry includes:

- `source_url`, `license`, `content_digest`  
- `security_profile` (`instructions-only` \| `includes-scripts`)  
- `permissions`  
- Context / reference token estimates  
- Metric fields that stay **null** until measured (never faked)

## 6. What we refuse

- Install-count as a ranking of quality  
- Skills that only restate what the base model already does  
- Undisclosed network calls in scripts  
- Benchmarks written to game the score  

## 7. Relationship to skills.sh

| | skills.sh | Knackbox |
|---|---|---|
| Primary signal | Install volume / trending | Tier + measurements + review |
| Scope | Whole ecosystem | Curated library + standard |
| Install | `npx skills add owner/repo` | Same **plus** `npx knackbox` packs/search/doctor |
| Score honesty | Popularity | Empty metrics shown as — until measured |

We stay fully compatible with the open Skills CLI. We compete on **trust and evidence**, not by forking the protocol.

## 8. Contributing under this standard

See [CONTRIBUTING.md](CONTRIBUTING.md) and [COMMUNITY.md](COMMUNITY.md).  
PRs that only add volume without suites or real expertise will be closed.
