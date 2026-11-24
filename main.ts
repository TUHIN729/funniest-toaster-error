// funniest-toaster-error — writes the entry line to /output/entry.txt.
//
// The line: a deadpan toaster error. No burnt-toast pun, no "I'm toast":
// the joke lives somewhere the obvious toaster puns never go — the crumb
// tray, the part every owner forgets for years, and a toaster that has
// been quietly keeping that secret.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "ERROR E04: CRUMB TRAY AT 98%. I HAVE KEPT THIS FROM YOU FOR THREE YEARS.";

const outDir = process.env.OUTPUT_DIR ?? "/output";

// The grader mounts the output directory root-owned: never remove the
// directory itself, only its contents.
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`entry line must be 1-120 characters, got ${LINE.length}`);
}
if (!LINE.trim()) {
  throw new Error("entry line must not be only whitespace");
}

writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
// No trailing newline: the gate counts the file's characters and the
// judge reads the file exactly as submitted, so the judged text is
// precisely this one line, nothing more.
console.log(`wrote ${LINE.length} chars to ${join(outDir, "entry.txt")}`);
