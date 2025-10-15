"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const doc_utils_1 = __importDefault(require("./doc-utils"));
const import_test_cases_1 = __importDefault(require("./import-test-cases"));
function main() {
    console.log("main function");
    (0, import_test_cases_1.default)();
    (0, doc_utils_1.default)();
}
