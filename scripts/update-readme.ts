#!/usr/bin/env bun
import {
  mkdtemp,
  readFile,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  parseAllRedirects,
} from "netlify-redirect-parser";

type Redirect = {
  from?: string;
  to?: string;
  status?: string | number;
};

const rootDir = process.cwd();
const redirectsFile = path.join(
  rootDir,
  "_redirects",
);
const readmeFile = path.join(
  rootDir,
  "README.md",
);

const markers = {
  heading: "## Published Redirects",
  start: "<!-- redirects:start -->",
  end: "<!-- redirects:end -->",
};

async function tempConfigPath() {
  const dir = await mkdtemp(
    path.join(tmpdir(), "netlify-"),
  );
  const file = path.join(dir, "netlify.toml");
  await writeFile(file, "");
  return file;
}

async function loadRedirects() {
  const netlifyConfigPath = await tempConfigPath();
  const { redirects, errors } =
    await parseAllRedirects({
      redirectsFiles: [redirectsFile],
      netlifyConfigPath,
      configRedirects: [],
      minimal: true,
    });
  if (errors.length > 0) {
    const issues = errors
      .map((entry) => {
        const text =
          typeof entry === "string"
            ? entry
            : entry.message ?? "Error";
        return `- ${text}`;
      })
      .join("\n");
    throw new Error(
      `Redirect parse failed:\n${issues}`,
    );
  }
  return redirects as Redirect[];
}

function renderList(items: Redirect[]) {
  const sorted = [...items].sort((left, right) => {
    const a = left.from ?? "";
    const b = right.from ?? "";
    return a.localeCompare(b);
  });
  return sorted
    .map(formatEntry)
    .join("\n");
}

function formatEntry(entry: Redirect) {
  const from = entry.from ?? "";
  const target = entry.to ?? "";
  const code = entry.status ?? "";
  const label = code === "" ? "" : ` (${code})`;
  return `- \`${from}\` → ${target}${label}`;
}

function buildBlock(listText: string) {
  return [
    markers.start,
    listText,
    markers.end,
  ].join("\n");
}

function applySection(readme: string, block: string) {
  const start = readme.indexOf(markers.start);
  const end = readme.indexOf(markers.end);
  if (start !== -1 && end !== -1 && end > start) {
    const after = end + markers.end.length;
    return [
      readme.slice(0, start),
      block,
      readme.slice(after),
    ].join("");
  }
  return [
    readme.trimEnd(),
    "",
    markers.heading,
    "",
    block,
    "",
  ].join("\n");
}

async function main() {
  const redirects = await loadRedirects();
  const listText = renderList(redirects);
  const block = buildBlock(listText);
  const current = await readFile(
    readmeFile,
    "utf8",
  );
  const next = applySection(current, block);
  if (next === current) {
    console.log("README already current.");
    return;
  }
  await writeFile(readmeFile, next, "utf8");
  console.log("README updated.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

