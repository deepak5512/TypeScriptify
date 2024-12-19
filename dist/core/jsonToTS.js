"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToTS = jsonToTS;
const utils_1 = require("./utils");
// Converts a JSON object to TypeScript interfaces.
function jsonToTS(jsonData, rootName = "Root") {
    const interfaceDefinitions = [];
    // Processes a JSON object and generates an interface definition.
    const processObject = (obj, interfaceName) => {
        let interfaceContent = `interface ${interfaceName} {\n`;
        for (const [key, value] of Object.entries(obj)) {
            const propertyName = key;
            const propertyType = getType(value);
            if (typeof value === "object" &&
                value !== null &&
                !Array.isArray(value)) {
                const childInterfaceName = (0, utils_1.formatInterfaceName)(propertyName);
                processObject(value, childInterfaceName);
                interfaceContent += `  ${propertyName}: ${childInterfaceName};\n`;
            }
            else if (Array.isArray(value) &&
                value.length > 0 &&
                typeof value[0] === "object") {
                const childInterfaceName = (0, utils_1.formatInterfaceName)((0, utils_1.capitalize)(propertyName));
                processObject(value[0], childInterfaceName);
                interfaceContent += `  ${propertyName}: ${childInterfaceName}[];\n`;
            }
            else {
                interfaceContent += `  ${propertyName}: ${propertyType};\n`;
            }
        }
        interfaceContent += `}\n`;
        interfaceDefinitions.push(interfaceContent);
    };
    // Gets the TypeScript type for a value.
    const getType = (value) => {
        if (value === null)
            return "any";
        if (Array.isArray(value)) {
            return value.length > 0 ? `${getType(value[0])}[]` : "any[]";
        }
        return (0, utils_1.isPrimitiveType)(value) ? typeof value : "any";
    };
    processObject(jsonData, rootName);
    return interfaceDefinitions.reverse().join("\n");
}
//# sourceMappingURL=jsonToTS.js.map