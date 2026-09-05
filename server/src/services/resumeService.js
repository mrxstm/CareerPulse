import { PDFParse } from "pdf-parse";
import { readFile } from "node:fs/promises";

export const extractResumeText = async(filePath) => {
    const buffer = await readFile(filePath);

    const parser = new PDFParse({
        data: buffer
    });

    try {
        const result = await parser.getText();
        return result.text;
    } finally {
        await parser.destroy();
    }
}