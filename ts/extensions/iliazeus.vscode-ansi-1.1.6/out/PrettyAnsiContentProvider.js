"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrettyAnsiContentProvider = void 0;
const path_1 = require("path");
const vscode_1 = require("vscode");
const ansi = require("./ansi");
const extension_1 = require("./extension");
class PrettyAnsiContentProvider {
    static toProviderUri(actualUri) {
        const tabName = "Preview: " + path_1.posix.basename(actualUri.path);
        const scheme = PrettyAnsiContentProvider.scheme;
        const path = encodeURIComponent(tabName);
        const query = encodeURIComponent(actualUri.toString());
        return vscode_1.Uri.parse(`${scheme}://show/${path}?${query}`, true);
    }
    static toActualUri(providerUri) {
        if (providerUri.scheme !== PrettyAnsiContentProvider.scheme) {
            throw new Error(`wrong uri scheme: ${providerUri.scheme}`);
        }
        return vscode_1.Uri.parse(providerUri.query, true);
    }
    constructor(editorRedrawWatcher) {
        this._onDidChange = new vscode_1.EventEmitter();
        this.onDidChange = this._onDidChange.event;
        this._watchedUris = new Set();
        this._disposables = [];
        this._isDisposed = false;
        this._editorRedrawWatcher = editorRedrawWatcher;
        this._disposables.push(vscode_1.workspace.onDidChangeTextDocument((event) => {
            const actualUri = event.document.uri;
            if (this._watchedUris.has(actualUri.toString())) {
                const providerUri = PrettyAnsiContentProvider.toProviderUri(actualUri);
                this._onDidChange.fire(providerUri);
            }
        }));
        this._fileSystemWatcher = vscode_1.workspace.createFileSystemWatcher("**/*", false, false, true);
        this._disposables.push(this._fileSystemWatcher);
        this._disposables.push(this._fileSystemWatcher.onDidChange((actualUri) => {
            if (this._watchedUris.has(actualUri.toString())) {
                const providerUri = PrettyAnsiContentProvider.toProviderUri(actualUri);
                this._onDidChange.fire(providerUri);
            }
        }));
        this._disposables.push(this._fileSystemWatcher.onDidCreate((actualUri) => {
            if (this._watchedUris.has(actualUri.toString())) {
                const providerUri = PrettyAnsiContentProvider.toProviderUri(actualUri);
                this._onDidChange.fire(providerUri);
            }
        }));
    }
    provideTextDocumentContent(providerUri) {
        return __awaiter(this, void 0, void 0, function* () {
            // VS Code does not emit `workspace.onDidChangeTextDocument` for the provided document
            // if the content is identical to the current one, despite us emitting `onDidChange`.
            // it means that we have to force-emit `onEditorRedraw` to correctly handle situations
            // when the escapes change, but the content itself remains the same.
            setImmediate(() => this._editorRedrawWatcher.forceEmitForUri(providerUri));
            const actualUri = PrettyAnsiContentProvider.toActualUri(providerUri);
            this._watchedUris.add(actualUri.toString());
            const actualDocument = yield vscode_1.workspace.openTextDocument(actualUri);
            const parser = new ansi.Parser();
            const textChunks = [];
            for (let lineNumber = 0; lineNumber < actualDocument.lineCount; lineNumber += 1) {
                const line = actualDocument.lineAt(lineNumber);
                const spans = parser.appendLine(line.text);
                const textSpans = spans.filter((span) => !(span.attributeFlags & ansi.AttributeFlags.EscapeSequence));
                textChunks.push(...textSpans.map(({ offset, length }) => line.text.substr(offset, length)), "\n");
            }
            return textChunks.join("");
        });
    }
    dispose() {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        for (const disposable of this._disposables) {
            disposable.dispose();
        }
    }
}
exports.PrettyAnsiContentProvider = PrettyAnsiContentProvider;
PrettyAnsiContentProvider.scheme = `${extension_1.extensionId}.pretty`;
//# sourceMappingURL=PrettyAnsiContentProvider.js.map