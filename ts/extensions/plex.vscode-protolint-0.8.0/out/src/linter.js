"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process");
const vscode = require("vscode");
const util = require("util");
const path = require("path");
const protoError_1 = require("./protoError");
class Linter {
    constructor(document) {
        this.codeDocument = document;
    }
    lint() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.runProtoLint();
            if (!result) {
                return [];
            }
            const lintingErrors = this.parseErrors(result);
            // When errors exist, but no linting errors were returned show the error window
            // in VSCode as it is most likely an issue with the binary itself such as not being
            // able to find a configuration or a file to lint.
            if (lintingErrors.length === 0) {
                vscode.window.showErrorMessage("protolint: " + result);
                return [];
            }
            return lintingErrors;
        });
    }
    getProtoLintPath() {
        let protoLintPath = vscode.workspace.getConfiguration('protolint').get('path');
        if (protoLintPath) {
            return protoLintPath;
        }
        // When there is no defined protolint path, just return the protolint binary which will
        // call protolint directly and assume that its available in the user's PATH.
        return "protolint";
    }
    runProtoLint() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!vscode.workspace.workspaceFolders) {
                return "";
            }
            let currentFile = this.codeDocument.uri.fsPath;
            let currentDirectory = path.dirname(currentFile);
            let protoLintPath = this.getProtoLintPath();
            const cmd = `${protoLintPath} lint "${currentFile}"`;
            // Execute the protolint binary and store the output from standard error.
            //
            // The output could either be an error from using the binary improperly, such as unable to find
            // a configuration, or linting errors.
            const exec = util.promisify(cp.exec);
            let lintResults = "";
            yield exec(cmd, {
                cwd: currentDirectory
            }).catch((error) => lintResults = error.stderr);
            return lintResults;
        });
    }
    parseErrors(errorStr) {
        let errors = errorStr.split('\n') || [];
        var result = errors.reduce((errors, currentError) => {
            const parsedError = protoError_1.parseProtoError(currentError);
            if (!parsedError.reason) {
                return errors;
            }
            const linterError = {
                proto: parsedError,
                range: this.codeDocument.lineAt(parsedError.line - 1).range
            };
            return errors.concat(linterError);
        }, []);
        return result;
    }
}
exports.default = Linter;
//# sourceMappingURL=linter.js.map