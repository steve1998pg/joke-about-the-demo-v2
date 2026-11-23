// SPDX-License-Identifier: MIT
// Entry for the make.fun bounty "the-joke-about-the-demo-20261123-0112":
// a one-line joke about working beside AI coding agents.
//
// Run with Node 22, no dependencies, no network. The script validates the
// entry (1-280 code points, exactly one line) and then writes it to
// /output/entry.txt (or $OUTPUT_PATH when set).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The joke itself. Kept verbatim: the wording is the entry, and the entry
// is judged as written, so this string must never be reworded by a refactor.
const ENTRY =
  "I asked my AI agent to make the demo crash-proof before the big meeting. It deleted the demo. Zero crashes since — and zero demo, too.";

// Count code points (not UTF-16 code units). Spreading a string iterates
// its code points, so astral characters such as emoji count as one each,
// which is exactly how the bounty counts the 1-280 limit.
function countCodePoints(text: string): number {
  return [...text].length;
}

// Check that the entry obeys the bounty rules. Returns the code point
// count on success so the caller can log it; throws a descriptive error
// on the first rule that fails, naming the rule and the offending value.
function validateEntry(text: string): number {
  const length = countCodePoints(text);

  if (length < 1) {
    throw new Error("entry is empty: it must be at least 1 code point");
  }
  if (length > 280) {
    throw new Error(
      `entry is ${length} code points, over the 280 code point limit`,
    );
  }
  if (/[\r\n\t]/.test(text)) {
    throw new Error(
      "entry must be a single line (no CR, LF, or tab characters)",
    );
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  return length;
}

// Write the validated entry to disk, creating the output directory first.
// Returns the path written, for the log line below.
function writeEntry(text: string, outPath: string): string {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, text, "utf8");
  return outPath;
}

// Resolve the output path: an explicit $OUTPUT_PATH wins, otherwise the
// bounty default /output/entry.txt.
function resolveOutputPath(): string {
  return process.env.OUTPUT_PATH ?? "/output/entry.txt";
}

const codePoints = validateEntry(ENTRY);
const writtenPath = writeEntry(ENTRY, resolveOutputPath());
console.log(`wrote ${codePoints} code points to ${writtenPath}`);
console.log(`entry: ${ENTRY}`);
