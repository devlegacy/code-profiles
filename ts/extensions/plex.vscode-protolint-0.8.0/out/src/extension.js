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
const vscode = require("vscode");
const cp = require("child_process");
const linter_1 = require("./linter");
const diagnosticCollection = vscode.languages.createDiagnosticCollection("protolint");
function activate(context) {
    // Verify that protolint can be successfully executed on the host machine by running the version command.
    // In the event the binary cannot be executed, tell the user where to download protolint from.
    const result = cp.spawnSync('protolint', ['version']);
    if (result.status !== 0) {
        vscode.window.showErrorMessage("protolint was not detected. Download from: https://github.com/yoheimuta/protolint");
        return;
    }
    vscode.commands.registerCommand('protolint.lint', runLint);
    vscode.workspace.onDidSaveTextDocument((document) => {
        vscode.commands.executeCommand('protolint.lint');
    });
    // Run the linter when the user changes the file that they are currently viewing
    // so that the lint results show up immediately.
    vscode.window.onDidChangeActiveTextEditor((e) => {
        vscode.commands.executeCommand('protolint.lint');
    });
}
exports.activate = activate;
function runLint() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    // We only want to run protolint on documents that are known to be
    // protocol buffer files.
    const doc = editor.document;
    if (doc.languageId !== 'proto3' && doc.languageId !== 'proto') {
        return;
    }
    doLint(doc, diagnosticCollection);
}
function doLint(codeDocument, collection) {
    return __awaiter(this, void 0, void 0, function* () {
        const linter = new linter_1.default(codeDocument);
        const errors = yield linter.lint();
        const diagnostics = errors.map(error => {
            return new vscode.Diagnostic(error.range, error.proto.reason, vscode.DiagnosticSeverity.Warning);
        });
        collection.set(codeDocument.uri, diagnostics);
    });
}
//# sourceMappingURL=extension.js.map