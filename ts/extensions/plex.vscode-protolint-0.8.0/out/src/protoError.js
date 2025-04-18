"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// parseProtoError takes the an error message from protolint
// and attempts to parse it as a linting error.
//
// Linting errors are in the format:
// [path/to/file.proto:line:column] an error message is here
function parseProtoError(error) {
    if (!error) {
        return getEmptyProtoError();
    }
    const errorLine = parseInt(error.split(".proto:")[1], 10);
    const errorReason = error.split("] ")[1];
    const protoError = {
        line: errorLine,
        reason: errorReason
    };
    return protoError;
}
exports.parseProtoError = parseProtoError;
function getEmptyProtoError() {
    const emptyProtoError = {
        line: 0,
        reason: ""
    };
    return emptyProtoError;
}
exports.getEmptyProtoError = getEmptyProtoError;
//# sourceMappingURL=protoError.js.map