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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnsiDecorationProvider = void 0;
const vscode_1 = require("vscode");
const ansi = require("./ansi");
const PrettyAnsiContentProvider_1 = require("./PrettyAnsiContentProvider");
function upsert(map, key, value) {
    var _a;
    return (_a = map.get(key)) !== null && _a !== void 0 ? _a : (map.set(key, value), value);
}
const ansiThemeColors = {
    [ansi.NamedColor.DefaultBackground]: undefined,
    [ansi.NamedColor.DefaultForeground]: undefined,
    [ansi.NamedColor.Black]: new vscode_1.ThemeColor("terminal.ansiBlack"),
    [ansi.NamedColor.BrightBlack]: new vscode_1.ThemeColor("terminal.ansiBrightBlack"),
    [ansi.NamedColor.White]: new vscode_1.ThemeColor("terminal.ansiWhite"),
    [ansi.NamedColor.BrightWhite]: new vscode_1.ThemeColor("terminal.ansiBrightWhite"),
    [ansi.NamedColor.Red]: new vscode_1.ThemeColor("terminal.ansiRed"),
    [ansi.NamedColor.BrightRed]: new vscode_1.ThemeColor("terminal.ansiBrightRed"),
    [ansi.NamedColor.Green]: new vscode_1.ThemeColor("terminal.ansiGreen"),
    [ansi.NamedColor.BrightGreen]: new vscode_1.ThemeColor("terminal.ansiBrightGreen"),
    [ansi.NamedColor.Yellow]: new vscode_1.ThemeColor("terminal.ansiYellow"),
    [ansi.NamedColor.BrightYellow]: new vscode_1.ThemeColor("terminal.ansiBrightYellow"),
    [ansi.NamedColor.Blue]: new vscode_1.ThemeColor("terminal.ansiBlue"),
    [ansi.NamedColor.BrightBlue]: new vscode_1.ThemeColor("terminal.ansiBrightBlue"),
    [ansi.NamedColor.Magenta]: new vscode_1.ThemeColor("terminal.ansiMagenta"),
    [ansi.NamedColor.BrightMagenta]: new vscode_1.ThemeColor("terminal.ansiBrightMagenta"),
    [ansi.NamedColor.Cyan]: new vscode_1.ThemeColor("terminal.ansiCyan"),
    [ansi.NamedColor.BrightCyan]: new vscode_1.ThemeColor("terminal.ansiBrightCyan"),
};
function convertColor(color) {
    if (color & ansi.ColorFlags.Named)
        return ansiThemeColors[color];
    return "#" + color.toString(16).padStart(6, "0");
}
class AnsiDecorationProvider {
    constructor() {
        this._decorationTypes = new Map([
            ["escape", vscode_1.window.createTextEditorDecorationType({ opacity: "50%" })],
        ]);
        this._isDisposed = false;
    }
    provideDecorationRanges(document) {
        if (document.uri.scheme === PrettyAnsiContentProvider_1.PrettyAnsiContentProvider.scheme) {
            return this._provideDecorationsForPrettifiedAnsi(document);
        }
        if (document.languageId === "ansi") {
            return this._provideDecorationsForAnsiLanguageType(document);
        }
        return undefined;
    }
    _provideDecorationsForAnsiLanguageType(document) {
        const result = new Map();
        for (const key of this._decorationTypes.keys()) {
            result.set(key, []);
        }
        const escapeDecorations = [];
        result.set("escape", escapeDecorations);
        const parser = new ansi.Parser();
        for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
            const line = document.lineAt(lineNumber);
            const spans = parser.appendLine(line.text);
            for (const span of spans) {
                const { offset, length } = span, style = __rest(span, ["offset", "length"]);
                const range = new vscode_1.Range(lineNumber, offset, lineNumber, offset + length);
                if (style.attributeFlags & ansi.AttributeFlags.EscapeSequence) {
                    escapeDecorations.push(range);
                    continue;
                }
                const key = JSON.stringify(style);
                upsert(result, key, []).push(range);
            }
        }
        return [...result];
    }
    _provideDecorationsForPrettifiedAnsi(providerDocument) {
        return __awaiter(this, void 0, void 0, function* () {
            const actualUri = PrettyAnsiContentProvider_1.PrettyAnsiContentProvider.toActualUri(providerDocument.uri);
            const actualDocument = yield vscode_1.workspace.openTextDocument(actualUri);
            const result = new Map();
            for (const key of this._decorationTypes.keys()) {
                result.set(key, []);
            }
            const parser = new ansi.Parser();
            for (let lineNumber = 0; lineNumber < actualDocument.lineCount; lineNumber += 1) {
                let totalEscapeLength = 0;
                const line = actualDocument.lineAt(lineNumber);
                const spans = parser.appendLine(line.text);
                for (const span of spans) {
                    const { offset, length } = span, style = __rest(span, ["offset", "length"]);
                    if (style.attributeFlags & ansi.AttributeFlags.EscapeSequence) {
                        totalEscapeLength += length;
                        continue;
                    }
                    const range = new vscode_1.Range(lineNumber, offset - totalEscapeLength, lineNumber, offset + length - totalEscapeLength);
                    const key = JSON.stringify(style);
                    upsert(result, key, []).push(range);
                }
            }
            return [...result];
        });
    }
    resolveDecoration(key) {
        let decorationType = this._decorationTypes.get(key);
        if (decorationType) {
            return decorationType;
        }
        const style = JSON.parse(key);
        decorationType = vscode_1.window.createTextEditorDecorationType({
            backgroundColor: convertColor(style.backgroundColor),
            color: convertColor(style.foregroundColor),
            fontWeight: style.attributeFlags & ansi.AttributeFlags.Bold ? "bold" : undefined,
            fontStyle: style.attributeFlags & ansi.AttributeFlags.Italic ? "italic" : undefined,
            textDecoration: style.attributeFlags & ansi.AttributeFlags.Underline ? "underline" : undefined,
            opacity: style.attributeFlags & ansi.AttributeFlags.Faint ? "50%" : undefined,
        });
        this._decorationTypes.set(key, decorationType);
        return decorationType;
    }
    dispose() {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        for (const decorationType of this._decorationTypes.values()) {
            decorationType.dispose();
        }
        this._decorationTypes.clear();
    }
}
exports.AnsiDecorationProvider = AnsiDecorationProvider;
//# sourceMappingURL=AnsiDecorationProvider.js.map