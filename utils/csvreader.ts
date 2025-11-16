
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";



export async function readCsv(filename: string): Promise<any[]> {

// 1️⃣ Read and parse the CSV
    const records = parse(
    fs.readFileSync(path.join(__dirname,"../data/", filename)), {
    columns: true,
    skip_empty_lines: true,
    }


);

    return records;

}