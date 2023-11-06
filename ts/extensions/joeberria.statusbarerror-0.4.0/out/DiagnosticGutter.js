"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_1 = require("vscode");
var DiagnosticGutter = /** @class */ (function () {
    function DiagnosticGutter() {
        var e_1, _a;
        var dirPath = vscode_1.extensions.getExtension('JoeBerria.statusbarerror').extensionPath;
        this._gutterShow = new Map([
            ['error', true],
            ['warn', true],
            ['info`', true],
            ['hint', true],
        ]);
        this._gutterItems = new Map();
        this._disposables = [];
        this._gutterDecorations = new Map()
            .set(vscode_1.DiagnosticSeverity.Error, vscode_1.window.createTextEditorDecorationType({
            gutterIconPath: dirPath + "/images/error.svg",
        })).set(vscode_1.DiagnosticSeverity.Warning, vscode_1.window.createTextEditorDecorationType({
            gutterIconPath: dirPath + "/images/warn.svg",
        })).set(vscode_1.DiagnosticSeverity.Information, vscode_1.window.createTextEditorDecorationType({
            gutterIconSize: '80%',
            gutterIconPath: dirPath + "/images/info.svg",
        })).set(vscode_1.DiagnosticSeverity.Hint, vscode_1.window.createTextEditorDecorationType({
            gutterIconSize: '80%',
            gutterIconPath: dirPath + "/images/info.svg",
        }));
        // this will act as our default gutter icon for the time being
        this._defaultGutterDecoration = vscode_1.window.createTextEditorDecorationType({
            gutterIconSize: '60%',
            gutterIconPath: vscode_1.extensions.getExtension('JoeBerria.statusbarerror').extensionPath + "/images/info.svg",
        });
        try {
            for (var _b = __values(this._gutterDecorations), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), value = _d[1];
                this._disposables.push(value);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    DiagnosticGutter.prototype.dispose = function () {
        var e_2, _a;
        try {
            for (var _b = __values(this._disposables), _c = _b.next(); !_c.done; _c = _b.next()) {
                var d = _c.value;
                d.dispose();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    DiagnosticGutter.prototype.showGutterIconsForDocument = function (uri) {
        var e_3, _a;
        if (!this._gutterShow) {
            return;
        }
        var gutterItems = this._gutterItems.get(uri.path);
        if (!!vscode_1.window.activeTextEditor && !!gutterItems) {
            var errorOptions = [];
            var warningOptions = [];
            var hintOptions = [];
            var infoOptions = [];
            try {
                for (var gutterItems_1 = __values(gutterItems), gutterItems_1_1 = gutterItems_1.next(); !gutterItems_1_1.done; gutterItems_1_1 = gutterItems_1.next()) {
                    var gutterItem = gutterItems_1_1.value;
                    if (gutterItem.icon === this._gutterDecorations.get(vscode_1.DiagnosticSeverity.Error)) {
                        errorOptions.push({ range: gutterItem.range });
                    }
                    if (gutterItem.icon === this._gutterDecorations.get(vscode_1.DiagnosticSeverity.Warning)) {
                        warningOptions.push({ range: gutterItem.range });
                    }
                    if (gutterItem.icon === this._gutterDecorations.get(vscode_1.DiagnosticSeverity.Hint)) {
                        hintOptions.push({ range: gutterItem.range });
                    }
                    if (gutterItem.icon === this._gutterDecorations.get(vscode_1.DiagnosticSeverity.Information)) {
                        infoOptions.push({ range: gutterItem.range });
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (gutterItems_1_1 && !gutterItems_1_1.done && (_a = gutterItems_1.return)) _a.call(gutterItems_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            if (this._gutterShow.get('error')) {
                vscode_1.window.activeTextEditor.setDecorations(this.getDecorator(vscode_1.DiagnosticSeverity.Error), errorOptions);
            }
            if (this._gutterShow.get('warn')) {
                vscode_1.window.activeTextEditor.setDecorations(this.getDecorator(vscode_1.DiagnosticSeverity.Warning), warningOptions);
            }
            if (this._gutterShow.get('hint')) {
                vscode_1.window.activeTextEditor.setDecorations(this.getDecorator(vscode_1.DiagnosticSeverity.Hint), hintOptions);
            }
            if (this._gutterShow.get('info')) {
                vscode_1.window.activeTextEditor.setDecorations(this.getDecorator(vscode_1.DiagnosticSeverity.Information), infoOptions);
            }
        }
    };
    DiagnosticGutter.prototype.removeForTextDocument = function (uri) {
        this._gutterItems.delete(uri.path);
    };
    DiagnosticGutter.prototype.updateForTextDocument = function (uri, items) {
        this._gutterItems.set(uri.path, items);
    };
    DiagnosticGutter.prototype.getDecorator = function (severity) {
        return this._gutterDecorations.get(severity) || this._defaultGutterDecoration;
    };
    DiagnosticGutter.prototype.updateSettings = function (showErr, showWarn, showHint, showInfo) {
        this._gutterShow
            .set('error', showErr)
            .set('warn', showWarn)
            .set('hint', showHint)
            .set('info', showInfo);
    };
    return DiagnosticGutter;
}());
exports.DiagnosticGutter = DiagnosticGutter;
//# sourceMappingURL=DiagnosticGutter.js.map