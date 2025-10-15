import generateDoc from "./doc-utils";
import importTestCases from "./import-test-cases";

function main() {
  console.log("main function");
  importTestCases();
  generateDoc();
}
