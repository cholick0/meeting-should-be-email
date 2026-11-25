import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MIN_CHARS = 1;
const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

const ENTRY =
  "Ninety minutes in, the meeting finally produced something: a calendar invite for the same meeting next week.";

function validateEntry(text: string): void {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS} to ${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validateEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
const written = readFileSync(OUTPUT_PATH);
const expected = Buffer.from(ENTRY, "utf8");
if (!written.equals(expected)) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
console.log(
  `Wrote ${ENTRY.length} characters to ${OUTPUT_PATH} (verified byte-for-byte)`,
);
