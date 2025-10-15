import generateDoc from "./doc-utils";
import importTestCases from "./import-test-cases";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function main() {
  await importTestCases();
  await generateDoc();
}

await main();
