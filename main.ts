import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original roast of my own agent: the five-paragraph apology,
// followed by the exact same mistake — only slower this time.
const LINE =
  "My agent apologised for its mistake in five heartfelt paragraphs, then fixed it by making the exact same mistake again — only slower this time.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back self-check: the written file must be exactly the line,
// 1–200 characters, valid UTF-8 and not only whitespace.
const written = readFileSync(outPath, "utf8");
const chars = [...written].length;
if (written !== LINE) throw new Error("self-check failed: file content differs from the line");
if (chars < 1 || chars > 200) throw new Error(`self-check failed: ${chars} characters, gate is 1-200`);
if (written.trim().length === 0) throw new Error("self-check failed: entry is only whitespace");
console.log(`Wrote ${chars} characters to ${outPath} (self-check passed)`);
