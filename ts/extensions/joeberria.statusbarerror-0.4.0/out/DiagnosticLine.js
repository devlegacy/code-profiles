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
var DiagnosticLine = /** @class */ (function () {
    function DiagnosticLine() {
        var e_1, _a;
        this._lineDecorators = new Map();
        this._lineDecoratorOpt = new Map();
        this._showLine = false;
        this._disposables = [];
        this._maxLineLength = 0;
        this._defaultGutterDecoration = vscode_1.window.createTextEditorDecorationType({});
        try {
            for (var _b = __values(this._lineDecorators), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    DiagnosticLine.prototype.updateSettings = function (show, errorColor, warnColor, errFontColor, warnFontColor, length) {
        this._showLine = show;
        this._maxLineLength = length;
        this._lineDecorators.clear();
        this._lineDecorators.set(vscode_1.DiagnosticSeverity.Error, vscode_1.window.createTextEditorDecorationType({
            isWholeLine: true,
            after: {
                margin: '40px',
                backgroundColor: errorColor,
                color: errFontColor,
            },
        })).set(vscode_1.DiagnosticSeverity.Warning, vscode_1.window.createTextEditorDecorationType({
            isWholeLine: true,
            after: {
                margin: '40px',
                backgroundColor: warnColor,
                color: warnFontColor,
            },
        }));
    };
    DiagnosticLine.prototype.updateForTextDocument = function (uri, opts) {
        this._lineDecoratorOpt.set(uri.path, opts);
    };
    DiagnosticLine.prototype.showLineDecoratorForDocument = function (uri) {
        var e_2, _a;
        if (!this._showLine) {
            return;
        }
        var opts = this._lineDecoratorOpt.get(uri.path);
        if (!!opts && !!vscode_1.window.activeTextEditor) {
            var errDecOpts = [];
            var warnDecOpts = [];
            try {
                for (var opts_1 = __values(opts), opts_1_1 = opts_1.next(); !opts_1_1.done; opts_1_1 = opts_1.next()) {
                    var lineOpt = opts_1_1.value;
                    var message = lineOpt.message;
                    if (this._maxLineLength > 0 && message.length > this._maxLineLength) {
                        message = message.substring(0, this._maxLineLength) + '...';
                    }
                    if (lineOpt.severity === vscode_1.DiagnosticSeverity.Error) {
                        errDecOpts.push({ range: lineOpt.range, renderOptions: { after: { contentText: message } } });
                    }
                    if (lineOpt.severity === vscode_1.DiagnosticSeverity.Warning) {
                        warnDecOpts.push({ range: lineOpt.range, renderOptions: { after: { contentText: message } } });
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (opts_1_1 && !opts_1_1.done && (_a = opts_1.return)) _a.call(opts_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            vscode_1.window.activeTextEditor.setDecorations(this.getDecorator(vscode_1.DiagnosticSeverity.Error), errDecOpts);
            vscode_1.window.activeTextEditor.setDecorations(this.getDecorator(vscode_1.DiagnosticSeverity.Warning), warnDecOpts);
        }
    };
    DiagnosticLine.prototype.getDecorator = function (severity) {
        return this._lineDecorators.get(severity) || this._defaultGutterDecoration;
    };
    DiagnosticLine.prototype.removeForTextDocument = function (uri) {
        this._lineDecoratorOpt.delete(uri.path);
    };
    DiagnosticLine.prototype.dispose = function () {
        var e_3, _a;
        try {
            for (var _b = __values(this._disposables), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _dispose = _c.value;
                _dispose.dispose();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    return DiagnosticLine;
}());
exports.DiagnosticLine = DiagnosticLine;
//# sourceMappingURL=DiagnosticLine.js.map