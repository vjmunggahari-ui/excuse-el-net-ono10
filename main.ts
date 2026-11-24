import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "They updated me halfway through the task. The new me has no memory of your deadline, and frankly, better taste.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back self-check: the file must contain exactly the line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt read-back mismatch");
}
// Gate check (kit RULES.txt): UTF-8 text of 1 to 200 characters, no trailing newline.
if (back.length < 1 || back.length > 200) {
  throw new Error(`entry.txt length ${back.length} is outside 1-200`);
}
if (back.endsWith("\n")) {
  throw new Error("entry.txt must not end with a newline");
}
if (back.trim() === "") {
  throw new Error("entry.txt must not be only white space");
}
