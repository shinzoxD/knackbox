import assert from "node:assert/strict";
import test from "node:test";

import { renderMarkdown } from "../src/lib/markdown.ts";

test("keeps wrapped unordered list lines in the same item", () => {
  const html = renderMarkdown([
    "- **[blocking]** — bugs, security vulnerabilities, data loss, race",
    "  conditions, and broken error handling.",
    "- **[important]** — performance traps and missing edge cases.",
  ].join("\n"));

  assert.equal(
    html,
    "<ul><li><strong>[blocking]</strong> — bugs, security vulnerabilities, data loss, race conditions, and broken error handling.</li><li><strong>[important]</strong> — performance traps and missing edge cases.</li></ul>"
  );
});

test("demotes headings one level when demoteHeadings is set", () => {
  const html = renderMarkdown("# Title\n\n###### Deep", { demoteHeadings: true });
  assert.equal(html, '<h2 id="title">Title</h2>\n<h6 id="deep">Deep</h6>');
});

test("keeps wrapped ordered list lines in the same item", () => {
  const html = renderMarkdown([
    "1. Name the location and explain the",
    "   consequence before proposing a fix.",
    "2. End with a verdict.",
  ].join("\n"));

  assert.equal(
    html,
    "<ol><li>Name the location and explain the consequence before proposing a fix.</li><li>End with a verdict.</li></ol>"
  );
});

test("escapes link attributes without changing query parameters", () => {
  const html = renderMarkdown(
    "[Search](https://example.com/search?q=agent+skills&category=coding)"
  );

  assert.equal(
    html,
    '<p><a href="https://example.com/search?q=agent+skills&amp;category=coding">Search</a></p>'
  );
});

test("keeps markdown syntax literal inside inline code", () => {
  const html = renderMarkdown(
    "Use `name*value*`, `[label](https://example.com)`, and `$&` literally."
  );

  assert.equal(
    html,
    '<p>Use <code>name*value*</code>, <code>[label](https://example.com)</code>, and <code>$&amp;</code> literally.</p>'
  );
});

test("renders inline code inside a link label", () => {
  const html = renderMarkdown("Read [`SKILL.md`](https://example.com/skill).");

  assert.equal(
    html,
    '<p>Read <a href="https://example.com/skill"><code>SKILL.md</code></a>.</p>'
  );
});
