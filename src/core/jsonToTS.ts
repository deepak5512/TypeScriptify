import { capitalize, formatInterfaceName, isPrimitiveType } from "./utils";

// Converts a JSON object to TypeScript interfaces.

export function jsonToTS(jsonData: any, rootName: string = "Root"): string {
  const interfaceDefinitions: string[] = [];

  // Processes a JSON object and generates an interface definition.

  const processObject = (obj: any, interfaceName: string) => {
    let interfaceContent = `interface ${interfaceName} {\n`;

    for (const [key, value] of Object.entries(obj)) {
      const propertyName = key;
      const propertyType = getType(value);

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const childInterfaceName = formatInterfaceName(propertyName);
        processObject(value, childInterfaceName);
        interfaceContent += `  ${propertyName}: ${childInterfaceName};\n`;
      } else if (
        Array.isArray(value) &&
        value.length > 0 &&
        typeof value[0] === "object"
      ) {
        const childInterfaceName = formatInterfaceName(
          capitalize(propertyName)
        );
        processObject(value[0], childInterfaceName);
        interfaceContent += `  ${propertyName}: ${childInterfaceName}[];\n`;
      } else {
        interfaceContent += `  ${propertyName}: ${propertyType};\n`;
      }
    }

    interfaceContent += `}\n`;
    interfaceDefinitions.push(interfaceContent);
  };

  // Gets the TypeScript type for a value.

  const getType = (value: any): string => {
    if (value === null) return "any";
    if (Array.isArray(value)) {
      return value.length > 0 ? `${getType(value[0])}[]` : "any[]";
    }
    return isPrimitiveType(value) ? typeof value : "any";
  };

  processObject(jsonData, rootName);
  
  return interfaceDefinitions.reverse().join("\n");
}
