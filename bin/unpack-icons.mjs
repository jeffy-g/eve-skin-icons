#!/usr/bin/env node
/*!
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  Copyright (C) 2025 jeffy-g <hirotom1107@gmail.com>
//  Released under the MIT license
//  https://opensource.org/licenses/mit-license.php
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
/**
 * @file scripts/unpack-icons.mts
 * @command bun scripts/unpack-icons.mts [-d ./images/skins -v]
 */
import * as fs from "fs";
import * as path from "path";
import { unzipSync } from "fflate";
import tinArgs from "tin-args"; // global install
import { fileURLToPath } from "url";
// support node v12 later (import.meta.url)
const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
function main(destDir) {
    const zipName = "skin-icons.zip";
    const zipPath = path.join(ROOT, zipName);
    if (!fs.existsSync(zipPath)) {
        throw new Error(`Could not unpack: ${zipPath} not found`);
    }
    const verbose = opt.v || opt.verbose;
    let failed;
    console.log(`Unpacking ${zipPath} → ${destDir}`);
    try {
        // Prepare output directory
        fs.mkdirSync(destDir, { recursive: true });
        // Read ZIP and unzip all at once
        const buffer = fs.readFileSync(zipPath);
        const files = unzipSync(new Uint8Array(buffer));
        // Write each entry as a file
        for (const [pngFile, uint8] of Object.entries(files)) {
            const outPath = path.join(destDir, pngFile);
            if (verbose) {
                console.log(`  ↳ ${pngFile}`);
            }
            fs.writeFileSync(outPath, Buffer.from(uint8));
        }
    }
    catch (e) {
        const reason = e instanceof Error ? e.message : String(e);
        console.error(`❌ [ERROR] Failed to unpack the archive.
    Source : ${zipPath}
    Target : ${destDir}
    Reason : ${reason}`);
        failed = true;
    }
    const msg = failed
        ? "⚠️  Unpack failed. Please check the error details above."
        : "✅ Unpack complete.";
    console.log(msg);
    failed && process.exit(1);
}
const opt = tinArgs();
console.log(opt);
const dest = opt.d || opt.dest || "./skin-icons";
if (dest) {
    // usage: node bin/unpack-icons.mjs -d ./images/skins -v
    main(dest);
}
