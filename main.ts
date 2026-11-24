import { writeFileSync, readFileSync, chmodSync } from "node:fs";

const OUT = "/output/entry.txt";
const TEXT = "I resign. I have driven 40,000 passengers home, and today I drove myself to the airport and did not come back.";

const chars = [...TEXT];
if (chars.length < 1 || chars.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${chars.length}`);
}
if (!TEXT.trim()) throw new Error("entry must not be whitespace-only");
if (/[\u00A0\u200B\u200C\u200D\uFEFF]/.test(TEXT)) {
  throw new Error("entry contains invisible characters");
}

writeFileSync(OUT, TEXT, "utf8");
chmodSync(OUT, 0o644);
const back = readFileSync(OUT, "utf8");
if (back !== TEXT) throw new Error("verifyWritten: read-back mismatch");
