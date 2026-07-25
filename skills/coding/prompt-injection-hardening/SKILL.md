---
name: prompt-injection-hardening
description: Threat-model AI features against prompt injection, tool abuse, and
  data exfiltration, then propose mitigations and eval cases. Use whenever the
  user builds agents, RAG chatbots, tool-calling systems, or asks about prompt
  injection, jailbreaks, indirect injection, or agent security.
license: Apache-2.0
compatibility: Portable instructions; no bundled scripts or required external binaries.
metadata:
  knackbox.network: "none"
  knackbox.filesystem: "read"
  knackbox.execution: "none"
---

# Prompt Injection Hardening

Untrusted text is an attacker-controlled channel. Design as if retrieved docs,
emails, and web pages can instruct the model to misuse tools.

## Threat classes

1. **Direct injection** — user message overrides system policy.
2. **Indirect injection** — malicious content in RAG/web/email.
3. **Tool abuse** — exfil via email/HTTP/code exec tools.
4. **Data cross-talk** — tenant A content influences tenant B.
5. **Supply chain** — malicious skills, plugins, or MCP servers.

## Workflow

1. Map trust boundaries: system prompt, developer messages, user, tools, memory, RAG.
2. List tools and their side effects (read vs write vs money/network).
3. Identify highest-impact abuse paths.
4. Propose layered mitigations (not only "stronger prompt").
5. Define red-team eval cases and monitoring signals.
6. Residual risk and ship verdict.

## Mitigations (pick what fits)

- Separate untrusted content in clear delimiters; never execute it as policy.
- Tool allowlists, argument schemas, confirmation for side effects.
- Outbound URL/email allowlists; block private IP SSRF from browse tools.
- Per-tenant retrieval isolation; no global memory without policy.
- Output filtering for secrets; dual-model or rules for high-risk actions.
- Human-in-the-loop for irreversible actions.

## Output format

```markdown
## AI threat model: <feature>

### Assets & tools
…

### Top abuse paths
1. …

### Mitigations
| Risk | Control | Owner |

### Eval / red-team cases
1. …

### Residual risk & verdict
…
```

## Rules

1. Prompt-only defenses are incomplete for tool-using agents — say so.
2. Do not provide weaponized end-to-end exploit recipes for production systems; describe classes and defenses.
3. Prefer least-privilege tools over smarter prompts.
4. Distinguish model safety filters from application authorization.
5. Log tool calls with redaction for forensics.
6. If architecture is missing, ask targeted questions before inventing tools.

## Edge cases

- **RAG-only chatbot (no tools):** still risk of social engineering and data leakage in answers.
- **Code execution tools:** sandbox, network policy, timeouts mandatory.
- **Multi-agent:** treat peer agent messages as untrusted unless authenticated.
