
![Alt Text](https://raw.githubusercontent.com/deepak5512/TypeScriptify/refs/heads/main/assets/typescriptify%20logo.png)

**Generate TypeScript interfaces/types directly from JSON data.**
# Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Philosophy](#philosophy)
- [Contributing to SynthData](#contributing-to-synthdata)
## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

If this is a brand new project, make sure to create a `package.json` first with the [npm init command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the [`npm install` command](https://docs.npmjs.com/downloading-and-installing-packages-locally):

```
$ npm install typescriptify
```
## Usage

#### CLI Usage

After installing the package globally, you can use the CLI to generate TypeScript types:

```
$ typescriptify input.json -o output.ts
```

- `input.json`: The JSON file to generate types from.
- `-o output.ts`: The optional flag to specify the output TypeScript file.

#### API Usage

```typescript
const { generateTypeScript } = require("typescriptify");

const jsonData = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
};

const tsInterface = generateTypeScript(jsonData, "User");

console.log(tsInterface);
```

### Output Example

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}
```
## Available Functions and Parameters

| **Function**              | **Description**                                                                 | **Parameters**                                                     |
|---------------------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------|
| `generateTypeScript(data, name)` | Converts JSON data into a TypeScript interface or type definition.         | `data` (object): The JSON data to convert.<br> `name` (string): The name of the interface/type. |

## Features

- Convert JSON to TypeScript interfaces or types.
- CLI for quick usage.
- API for programmatic access.
- Seamless integration into existing workflows.
## Contributing to TypeScriptify

- [DeepakBhatter](https://github.com/deepak5512) - Deepak Bhatter 
