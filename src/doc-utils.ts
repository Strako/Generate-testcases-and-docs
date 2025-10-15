import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  ShadingType,
} from "docx";
import * as fs from "fs";
import { data } from "./data/data";
import { titles } from "./data/titles";

// ===============================
// Data types
// ===============================

interface TestCase {
  title: string;
  description: string;
  test_case: string;
  test_type: string;
  isFirst: boolean;
}

interface Title {
  text: string;
}

// ===============================
// Create test case table
// ===============================

function createTestCaseTable(testId: number, tc: TestCase): Table {
  const headerCell = new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: `ID – ${testId}`,
            bold: true,
            color: "FFFFFF",
          }),
        ],
        alignment: AlignmentType.CENTER,
      }),
    ],
    shading: {
      fill: "0E4CB2",
      type: ShadingType.CLEAR,
      color: "auto",
    },
    columnSpan: 2,
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: [headerCell] }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph("Título")] }),
          new TableCell({ children: [new Paragraph(tc.title)] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph("Descripción")] }),
          new TableCell({ children: [new Paragraph(tc.description)] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph("Caso de prueba")] }),
          new TableCell({ children: [new Paragraph(tc.test_case)] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph("Tipo de test")] }),
          new TableCell({ children: [new Paragraph(tc.test_type)] }),
        ],
      }),
    ],
  });
}

// ===============================
// Generate word document
// ===============================

export default async function generateDoc() {
  const testCasesData: TestCase[] = data;
  const titlesData: Title[] = titles;
  let TEST_ID = 1228;
  let TITLE_IDX = 0;

  const allParagraphs: (Paragraph | Table)[] = [];

  for (const tc of testCasesData) {
    if (tc.isFirst) {
      allParagraphs.push(
        new Paragraph({ children: [new TextRun({ break: 1 })] }),
        new Paragraph({
          text: titlesData[TITLE_IDX].text,
          heading: HeadingLevel.HEADING_1,
        }),
      );
      TITLE_IDX++;
    }

    const table = createTestCaseTable(TEST_ID, tc);
    allParagraphs.push(
      new Paragraph({ text: "" }),
      table,
      new Paragraph({ text: "" }),
    );

    TEST_ID++;
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: allParagraphs,
      },
    ],
  });
  try {
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync("final_document.docx", buffer);
    console.log("✅ Document generated successfully: final_document.docx");
  } catch (error) {
    console.error("❌ Error while saving final_document.docx", error);
  }
}
