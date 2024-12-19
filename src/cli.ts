#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { jsonToTS } from './core/jsonToTS';
import { formatInterfaceName } from './core/utils';

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
  } catch (error) {
    console.error('Error: Invalid JSON file.');
    process.exit(1);
  }

  const outputOptionIndex = args.findIndex(
    (arg) => arg === '-o' || arg === '--output'
  );
  const outputFile =
    outputOptionIndex !== -1 ? args[outputOptionIndex + 1] : null;

  const nameOptionIndex = args.findIndex(
    (arg) => arg === '-n' || arg === '--name'
  );
  const rootName =
    nameOptionIndex !== -1
      ? formatInterfaceName(args[nameOptionIndex + 1])
      : 'Root';

  const tsInterfaces = jsonToTS(parsedJSON, rootName);

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error writing to output file: ${error.message}`);
      } else {
        console.error(
          'Error writing to output file: An unknown error occurred.'
        );
      }
      process.exit(1);
    }
  } else {
    console.log(tsInterfaces);
  }
};

// Run the CLI
runCLI();
