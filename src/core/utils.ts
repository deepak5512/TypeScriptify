// Capitalizes the first letter of a string.

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

// Formats a string to be used as a valid TypeScript interface name. Removes invalid characters and capitalizes the string.

export const formatInterfaceName = (name: string): string =>
  capitalize(name.replace(/[^a-zA-Z0-9]/g, ""));

// Checks if a value is of a primitive type.

export const isPrimitiveType = (value: any): boolean => {
  return ["string", "number", "boolean"].includes(typeof value);
};
