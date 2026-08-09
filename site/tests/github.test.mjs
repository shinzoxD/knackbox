import assert from "node:assert/strict";
import test from "node:test";

import { githubFileLinkBase } from "../src/lib/github.ts";
import { renderMarkdown } from "../src/lib/markdown.ts";

test("resolves links from root repository documents through GitHub content", () => {
  const html = renderMarkdown("[Security](SECURITY.md)", {
    linkBase: githubFileLinkBase("CONTRIBUTING.md"),
  });

  assert.equal(
    html,
    '<p><a href="https://github.com/shinzoxD/knackbox/blob/main/SECURITY.md">Security</a></p>'
  );
});

test("resolves links relative to nested skill documents", () => {
  const html = renderMarkdown("[OWASP](references/owasp-top10.md)", {
    linkBase: githubFileLinkBase("skills/coding/security-review/SKILL.md"),
  });

  assert.equal(
    html,
    '<p><a href="https://github.com/shinzoxD/knackbox/blob/main/skills/coding/security-review/references/owasp-top10.md">OWASP</a></p>'
  );
});
