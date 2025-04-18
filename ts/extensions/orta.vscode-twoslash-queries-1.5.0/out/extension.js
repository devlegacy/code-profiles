"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const queries_1 = require("./queries");
const helpers_1 = require("./helpers");
function activate(context) {
    registerInlayHintsProvider(context);
    registerInsertTwoSlashQueryCommand(context);
    registerInsertInlineQueryCommand(context);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
function registerInlayHintsProvider(context) {
    const provider = {
        provideInlayHints: async (model, iRange, cancel) => {
            const offset = model.offsetAt(iRange.start);
            const text = model.getText(iRange);
            return await (0, queries_1.getHintsFromQueries)({ text, offset, model, cancel });
        },
    };
    context.subscriptions.push(vscode.languages.registerInlayHintsProvider([{ language: "javascript" }, { language: "typescript" }, { language: "typescriptreact" }, { language: "javascriptreact" }], provider));
}
function registerInsertTwoSlashQueryCommand(context) {
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('orta.vscode-twoslash-queries.insert-twoslash-query', async (textEditor) => {
        const { document, selection: { active } } = textEditor;
        const currLine = document.lineAt(active.line);
        let padding = active.character;
        let eolRange = currLine.range.end;
        if (currLine.isEmptyOrWhitespace) {
            const prevLine = document.lineAt(active.line - 1);
            const hint = await (0, helpers_1.getLeftMostHintOfLine)({
                model: document,
                position: prevLine.range.start,
                lineLength: prevLine.text.length + 1,
            });
            const position = hint?.body?.start.offset;
            if (position) {
                padding = position - 1;
                eolRange = prevLine.range.end;
            }
        }
        const comment = '//'.padStart(currLine.firstNonWhitespaceCharacterIndex + 2).padEnd(padding, ' ').concat('^?');
        textEditor.edit(editBuilder => {
            const eolChar = document.eol === vscode.EndOfLine.LF ? '\n' : '\r\n';
            editBuilder.insert(eolRange, eolChar + comment);
        });
    }));
}
function registerInsertInlineQueryCommand(context) {
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('orta.vscode-twoslash-queries.insert-inline-query', (textEditor) => {
        const { document, selection: { end } } = textEditor;
        const eolRange = document.lineAt(end.line).range.end;
        const comment = ' // =>';
        textEditor.edit(editBuilder => editBuilder.insert(eolRange, comment));
    }));
}
//# sourceMappingURL=extension.js.map