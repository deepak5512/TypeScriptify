#!/usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const jsonToTS_1 = require("./core/jsonToTS");
const utils_1 = require("./core/utils");
// Displays help information for the CLI.
const displayHelp = () => {
    console.log(`
Usage: json-to-ts [options] <file>

Options:
  -o, --output <file>   Specify the output file for the generated TypeScript code.
  -n, --name <name>     Specify the root interface name (default: Root).
  -h, --help            Show help information.

Examples:
  json-to-ts data.json
  json-to-ts data.json -o types.ts
  json-to-ts data.json -n MyInterface
`);
};
// Parses CLI arguments and executes the necessary operations.
const runCLI = () => {
    const args = process.argv.slice(2);
    if (args.includes('-h') || args.includes('--help')) {
        displayHelp();
        return;
    }
    if (args.length === 0) {
        console.error('Error: No input file specified.');
        displayHelp();
        process.exit(1);
    }
    const inputFile = args[args.length - 1];
    if (!fs.existsSync(inputFile)) {
        console.error(`Error: File not found: ${inputFile}`);
        process.exit(1);
    }
    const jsonData = fs.readFileSync(inputFile, 'utf-8');
    let parsedJSON;
    try {
        parsedJSON = JSON.parse(jsonData);
    }
    catch (error) {
        console.error('Error: Invalid JSON file.');
        process.exit(1);
    }
    const outputOptionIndex = args.findIndex((arg) => arg === '-o' || arg === '--output');
    const outputFile = outputOptionIndex !== -1 ? args[outputOptionIndex + 1] : null;
    const nameOptionIndex = args.findIndex((arg) => arg === '-n' || arg === '--name');
    const rootName = nameOptionIndex !== -1
        ? (0, utils_1.formatInterfaceName)(args[nameOptionIndex + 1])
        : 'Root';
    const tsInterfaces = (0, jsonToTS_1.jsonToTS)(parsedJSON, rootName);
    if (outputFile) {
        const outputPath = path.resolve(outputFile);
        // Ensure the directory exists before writing the file.
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        try {
            fs.writeFileSync(outputPath, tsInterfaces, 'utf-8');
            console.log(`TypeScript interfaces have been written to: ${outputPath}`);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(`Error writing to output file: ${error.message}`);
            }
            else {
                console.error('Error writing to output file: An unknown error occurred.');
            }
            process.exit(1);
        }
    }
    else {
        console.log(tsInterfaces);
    }
};
// Run the CLI
runCLI();
//# sourceMappingURL=cli.js.map