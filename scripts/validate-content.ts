import { readdir, readFile } from "node:fs/promises";
import { contentDocumentSchema } from "../src/lib/content-schema";

const contentDirectory = "docs/research";

async function main() {
  let hasError = false;
  const files = (await readdir(contentDirectory))
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => `${contentDirectory}/${file}`);

  for (const file of files) {
    const raw = JSON.parse(await readFile(file, "utf8"));
    const result = contentDocumentSchema.safeParse(raw);

    if (!result.success) {
      hasError = true;
      console.error(`Invalid content: ${file}`);
      console.error(result.error.issues);
    } else {
      console.log(`Valid content: ${file}`);
    }
  }

  if (hasError) {
    process.exit(1);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
