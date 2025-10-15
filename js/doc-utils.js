"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateDoc;
const docx_1 = require("docx");
const fs = __importStar(require("fs"));
const data_1 = require("./data/data");
const titles_1 = require("./data/titles");
// ===============================
// Create test case table
// ===============================
function createTestCaseTable(testId, tc) {
    const headerCell = new docx_1.TableCell({
        children: [
            new docx_1.Paragraph({
                children: [
                    new docx_1.TextRun({
                        text: `ID – ${testId}`,
                        bold: true,
                        color: "FFFFFF",
                    }),
                ],
                alignment: docx_1.AlignmentType.CENTER,
            }),
        ],
        shading: {
            fill: "0E4CB2",
            type: docx_1.ShadingType.CLEAR,
            color: "auto",
        },
        columnSpan: 2,
    });
    return new docx_1.Table({
        width: { size: 100, type: docx_1.WidthType.PERCENTAGE },
        rows: [
            new docx_1.TableRow({ children: [headerCell] }),
            new docx_1.TableRow({
                children: [
                    new docx_1.TableCell({ children: [new docx_1.Paragraph("Título")] }),
                    new docx_1.TableCell({ children: [new docx_1.Paragraph(tc.title)] }),
                ],
            }),
            new docx_1.TableRow({
                children: [
                    new docx_1.TableCell({ children: [new docx_1.Paragraph("Descripción")] }),
                    new docx_1.TableCell({ children: [new docx_1.Paragraph(tc.description)] }),
                ],
            }),
            new docx_1.TableRow({
                children: [
                    new docx_1.TableCell({ children: [new docx_1.Paragraph("Caso de prueba")] }),
                    new docx_1.TableCell({ children: [new docx_1.Paragraph(tc.test_case)] }),
                ],
            }),
            new docx_1.TableRow({
                children: [
                    new docx_1.TableCell({ children: [new docx_1.Paragraph("Tipo de test")] }),
                    new docx_1.TableCell({ children: [new docx_1.Paragraph(tc.test_type)] }),
                ],
            }),
        ],
    });
}
// ===============================
// Generate word document
// ===============================
function generateDoc() {
    return __awaiter(this, void 0, void 0, function* () {
        const testCasesData = data_1.data;
        const titlesData = titles_1.titles;
        let TEST_ID = 1228;
        let TITLE_IDX = 0;
        const allParagraphs = [];
        for (const tc of testCasesData) {
            if (tc.isFirst) {
                allParagraphs.push(new docx_1.Paragraph({ children: [new docx_1.TextRun({ break: 1 })] }), new docx_1.Paragraph({
                    text: titlesData[TITLE_IDX].text,
                    heading: docx_1.HeadingLevel.HEADING_1,
                }));
                TITLE_IDX++;
            }
            const table = createTestCaseTable(TEST_ID, tc);
            allParagraphs.push(new docx_1.Paragraph({ text: "" }), table, new docx_1.Paragraph({ text: "" }));
            TEST_ID++;
        }
        const doc = new docx_1.Document({
            sections: [
                {
                    properties: {},
                    children: allParagraphs,
                },
            ],
        });
        try {
            const buffer = yield docx_1.Packer.toBuffer(doc);
            fs.writeFileSync("final_document.docx", buffer);
            console.log("✅ Document generated successfully: final_document.docx");
        }
        catch (error) {
            console.error("❌ Error while saving final_document.docx", error);
        }
    });
}
