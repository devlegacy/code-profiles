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
exports.deactivate = exports.activate = exports.extensionId = void 0;
const vscode_1 = require("vscode");
const AnsiDecorationProvider_1 = require("./AnsiDecorationProvider");
const EditorRedrawWatcher_1 = require("./EditorRedrawWatcher");
const PrettyAnsiContentProvider_1 = require("./PrettyAnsiContentProvider");
const TextEditorDecorationProvider_1 = require("./TextEditorDecorationProvider");
exports.extensionId = "iliazeus.vscode-ansi";
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const editorRedrawWatcher = new EditorRedrawWatcher_1.EditorRedrawWatcher();
        context.subscriptions.push(editorRedrawWatcher);
        const prettyAnsiContentProvider = new PrettyAnsiContentProvider_1.PrettyAnsiContentProvider(editorRedrawWatcher);
        context.subscriptions.push(prettyAnsiContentProvider);
        context.subscriptions.push(vscode_1.workspace.registerTextDocumentContentProvider(PrettyAnsiContentProvider_1.PrettyAnsiContentProvider.scheme, prettyAnsiContentProvider));
        const showPretty = (options) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const actualUri = (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri;
            if (!actualUri) {
                return;
            }
            const providerUri = PrettyAnsiContentProvider_1.PrettyAnsiContentProvider.toProviderUri(actualUri);
            yield vscode_1.window.showTextDocument(providerUri, options);
        });
        context.subscriptions.push(vscode_1.commands.registerCommand(`${exports.extensionId}.showPretty`, () => showPretty({ viewColumn: vscode_1.ViewColumn.Active })));
        context.subscriptions.push(vscode_1.commands.registerCommand(`${exports.extensionId}.showPrettyToSide`, () => showPretty({ viewColumn: vscode_1.ViewColumn.Beside })));
        const ansiDecorationProvider = new AnsiDecorationProvider_1.AnsiDecorationProvider();
        context.subscriptions.push(ansiDecorationProvider);
        context.subscriptions.push((0, TextEditorDecorationProvider_1.registerTextEditorDecorationProvider)(ansiDecorationProvider));
        context.subscriptions.push(editorRedrawWatcher.onEditorRedraw((editor) => __awaiter(this, void 0, void 0, function* () {
            const tokenSource = new vscode_1.CancellationTokenSource();
            yield (0, TextEditorDecorationProvider_1.executeRegisteredTextEditorDecorationProviders)(editor, tokenSource.token);
            tokenSource.dispose();
        })));
        context.subscriptions.push(vscode_1.commands.registerTextEditorCommand(`${exports.extensionId}.insertEscapeCharacter`, (editor, edit) => {
            edit.delete(editor.selection);
            edit.insert(editor.selection.end, "\x1b");
        }));
    });
}
exports.activate = activate;
function deactivate() {
    // sic
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map