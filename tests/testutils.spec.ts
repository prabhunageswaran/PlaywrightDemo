import {readCsv} from '../utils/csvreader';
import { test } from "@playwright/test";



test('test', async() => {
    const records:string[] = await readCsv('inputs.csv');
        console.log(records);
});


