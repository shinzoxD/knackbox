type RenderOptions = {
  linkBase?: string;
};

export function stripFrontmatter(text: string): string {
  if (!text.startsWith("---")) {
    return text;
  }
  const parts = text.split("---", 3);
  if (parts.length < 3) {
    return text;
  }
  return text.slice(parts[0].length + parts[1].length + 6);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveLink(href: string, options: RenderOptions): string {
  if (/^(https?:|mailto:|#|data:)/.test(href) || !options.linkBase) {
    return href;
  }
  return `${options.linkBase.replace(/\/$/, "")}/${href.replace(/^\.\//, "")}`;
}

function inlineMarkdown(value: string, options: RenderOptions): string {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match, label: string, href: string) =>
      `<a href="${escapeAttribute(resolveLink(href, options))}">${label}</a>`
  );
  return html;
}

function tableToHtml(lines: string[], options: RenderOptions): string {
  const rows = lines.map((line) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim())
  );
  const [head, , ...body] = rows;
  const headers = head
    .map((cell) => `<th>${inlineMarkdown(cell, options)}</th>`)
    .join("");
  const bodyRows = body
    .map(
      (row) =>
        `<tr>${row
          .map((cell) => `<td>${inlineMarkdown(cell, options)}</td>`)
          .join("")}</tr>`
    )
    .join("");
  return `<div class="overflow-x-auto"><table><thead><tr>${headers}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
}

function isTableSeparator(line: string): boolean {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function listToHtml(
  lines: string[],
  startIndex: number,
  marker: RegExp,
  tag: "ul" | "ol",
  options: RenderOptions
): { html: string; endIndex: number } {
  const items: string[] = [];
  let index = startIndex;

  while (index < lines.length) {
    const match = marker.exec(lines[index].trim());
    if (!match) {
      break;
    }

    const parts = [match[1]];
    index += 1;
    while (index < lines.length) {
      const continuation = lines[index];
      const trimmed = continuation.trim();
      if (!trimmed || marker.test(trimmed) || !/^\s{2,}\S/.test(continuation)) {
        break;
      }
      parts.push(trimmed);
      index += 1;
    }
    items.push(`<li>${inlineMarkdown(parts.join(" "), options)}</li>`);
  }

  return {
    html: `<${tag}>${items.join("")}</${tag}>`,
    endIndex: index - 1,
  };
}

export function renderMarkdown(markdown: string, options: RenderOptions = {}): string {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }
    out.push(`<p>${inlineMarkdown(paragraph.join(" "), options)}</p>`);
    paragraph = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    if (trimmed.startsWith("```")) {
      flushParagraph();
      const language = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      const className = language ? ` class="language-${escapeAttribute(language)}"` : "";
      out.push(`<pre><code${className}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      const content = inlineMarkdown(heading[2], options);
      const id = slugify(heading[2]);
      out.push(`<h${level} id="${id}">${content}</h${level}>`);
      continue;
    }

    if (
      trimmed.includes("|") &&
      index + 1 < lines.length &&
      isTableSeparator(lines[index + 1])
    ) {
      flushParagraph();
      const tableLines = [line, lines[index + 1]];
      index += 2;
      while (index < lines.length && lines[index].trim().includes("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }
      index -= 1;
      out.push(tableToHtml(tableLines, options));
      continue;
    }

    const unordered = /^[-*]\s+(.+)$/.exec(trimmed);
    if (unordered) {
      flushParagraph();
      const list = listToHtml(lines, index, /^[-*]\s+(.+)$/, "ul", options);
      index = list.endIndex;
      out.push(list.html);
      continue;
    }

    const ordered = /^\d+\.\s+(.+)$/.exec(trimmed);
    if (ordered) {
      flushParagraph();
      const list = listToHtml(lines, index, /^\d+\.\s+(.+)$/, "ol", options);
      index = list.endIndex;
      out.push(list.html);
      continue;
    }

    if (trimmed.startsWith(">")) {
      flushParagraph();
      const quotes: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quotes.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      index -= 1;
      out.push(`<blockquote>${inlineMarkdown(quotes.join(" "), options)}</blockquote>`);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  return out.join("\n");
}
