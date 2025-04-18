"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorRedrawWatcher = void 0;
const vscode_1 = require("vscode");
class EditorRedrawWatcher {
    _updateVisibleEditorSubscriptions(editors) {
        for (const subscription of this._visibleEditorSubscriptions) {
            subscription.dispose();
        }
        this._visibleEditorSubscriptions = editors.map((editor) => vscode_1.workspace.onDidChangeTextDocument((event) => {
            if (event.document !== editor.document) {
                return;
            }
            this._onEditorRedraw.fire(editor);
        }));
    }
    constructor() {
        this._onEditorRedraw = new vscode_1.EventEmitter();
        this.onEditorRedraw = this._onEditorRedraw.event;
        this._visibleEditorSubscriptions = [];
        this._disposables = [];
        this._isDisposed = false;
        this._disposables.push(vscode_1.workspace.onDidOpenTextDocument((document) => {
            for (const editor of vscode_1.window.visibleTextEditors) {
                if (editor.document === document) {
                    this._onEditorRedraw.fire(editor);
                }
            }
        }), vscode_1.window.onDidChangeVisibleTextEditors((editors) => {
            this._updateVisibleEditorSubscriptions(editors);
            for (const editor of editors) {
                this._onEditorRedraw.fire(editor);
            }
        }));
        this._updateVisibleEditorSubscriptions(vscode_1.window.visibleTextEditors);
        setImmediate(() => {
            for (const editor of vscode_1.window.visibleTextEditors) {
                this._onEditorRedraw.fire(editor);
            }
        });
    }
    forceEmitForUri(uri) {
        for (const editor of vscode_1.window.visibleTextEditors) {
            if (editor.document.uri.toString() === uri.toString()) {
                this._onEditorRedraw.fire(editor);
            }
        }
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
exports.EditorRedrawWatcher = EditorRedrawWatcher;
//# sourceMappingURL=EditorRedrawWatcher.js.map