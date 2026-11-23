// SPDX-License-Identifier: MIT
// Entry for make.fun bounty "the-joke-about-the-demo-20261123-0112":
// a one-line joke about working beside AI coding agents.
// Writes the joke to /output/entry.txt (1-280 characters).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "I asked my AI agent to make the demo crash-proof before the big meeting. It deleted the demo. Zero crashes since — and zero demo, too.";

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
const chars = [...ENTRY].length;
if (chars < 1 || chars > 280) {
  throw new Error(`entry must be 1-280 characters, got ${chars}`);
}
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${chars} characters to ${outPath}`);
