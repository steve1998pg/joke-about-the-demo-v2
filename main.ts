// SPDX-License-Identifier: MIT
// Entry for the make.fun bounty "the-joke-about-the-demo-20261123-0112":
// a one-line joke about working beside AI coding agents.
// Run with Node 22, no dependencies, no network.
// Writes the joke to /output/entry.txt (1-280 code points).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "I asked my AI agent to make the demo crash-proof before the big meeting. It deleted the demo. Zero crashes since — and zero demo, too.";

// Count code points (not UTF-16 units) so emoji/punctuation are counted fairly.
const length = [...ENTRY].length;
if (length < 1 || length > 280) {
  throw new Error(`entry must be 1-280 code points, got ${length}`);
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line (no line breaks)");
}

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${length} code points to ${outPath}`);
