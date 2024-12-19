"use strict";
// Capitalizes the first letter of a string.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrimitiveType = exports.formatInterfaceName = exports.capitalize = void 0;
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
exports.capitalize = capitalize;
// Formats a string to be used as a valid TypeScript interface name. Removes invalid characters and capitalizes the string.
const formatInterfaceName = (name) => (0, exports.capitalize)(name.replace(/[^a-zA-Z0-9]/g, ""));
exports.formatInterfaceName = formatInterfaceName;
// Checks if a value is of a primitive type.
const isPrimitiveType = (value) => {
    return ["string", "number", "boolean"].includes(typeof value);
};
exports.isPrimitiveType = isPrimitiveType;
//# sourceMappingURL=utils.js.map