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
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_1 = require("vscode");
var DiagnosticBar = /** @class */ (function () {
    function DiagnosticBar(item, gutterDecorator, lineDecorator) {
        var _this = this;
        this._visible = true;
        this._disposables = [];
        this._statusBarItem = item;
        this._currentDiagnostics = new Map();
        this._gutterDecorator = gutterDecorator;
        this._lineDecorator = lineDecorator;
        this._currentDocURI = vscode_1.window.activeTextEditor ? vscode_1.window.activeTextEditor.document.uri : vscode_1.Uri.file('.');
        this._currentColors = {
            warning: '#f4b81f',
            info: '#41e086',
            error: '#f41f1f',
            hint: '#35b1f4',
        };
        this._currentIcons = {
            warning: '',
            info: '',
            error: '',
            hint: '',
        };
        this._disposables.push(this._gutterDecorator);
        this._disposables.push(this._lineDecorator);
        this._disposables.push(vscode_1.Disposable.from(this._statusBarItem));
        this._disposables.push(vscode_1.languages.onDidChangeDiagnostics(function (e) { return _this.diagnosticChangedListener(e); }));
    }
    DiagnosticBar.prototype.activeEditorChanged = function (editor) {
        this.updateDiagnosticList(editor.document.uri);
        this._currentDocURI = editor.document.uri;
        this._gutterDecorator.showGutterIconsForDocument(this._currentDocURI);
        this._lineDecorator.showLineDecoratorForDocument(this._currentDocURI);
        this.updateStatusbarMessage(editor.selection.active.line);
    };
    DiagnosticBar.prototype.cursorSelectionChangedListener = function (selection) {
        var cursorLine = selection.selections[0].active.line;
        this.updateStatusbarMessage(cursorLine);
    };
    DiagnosticBar.prototype.textDocumentClosedListener = function (uri) {
        if (this._currentDiagnostics.has(uri.path)) {
            this._currentDiagnostics.delete(uri.path);
            this._gutterDecorator.removeForTextDocument(this._currentDocURI);
            this._lineDecorator.removeForTextDocument(this._currentDocURI);
            this._statusBarItem.hide();
        }
    };
    DiagnosticBar.prototype.setIcons = function (info, hint, warning, error) {
        this._currentIcons = {
            info: info,
            hint: hint,
            warning: warning,
            error: error,
        };
    };
    DiagnosticBar.prototype.setColors = function (info, hint, warning, error) {
        this._currentColors = {
            info: info,
            hint: hint,
            warning: warning,
            error: error,
        };
    };
    DiagnosticBar.prototype.setGutterDecorator = function (showErr, showWarn, showHint, showInfo) {
        this._gutterDecorator.updateSettings(showErr, showWarn, showHint, showInfo);
        this._gutterDecorator.showGutterIconsForDocument(this._currentDocURI);
    };
    DiagnosticBar.prototype.setWholeLine = function (show, errorColor, warnColor, errorFontColor, warnFontColor, length) {
        this._lineDecorator.updateSettings(show, errorColor, warnColor, errorFontColor, warnFontColor, length);
        this._lineDecorator.showLineDecoratorForDocument(this._currentDocURI);
    };
    DiagnosticBar.prototype.clearStatusBarText = function () {
        this._statusBarItem.text = '';
    };
    DiagnosticBar.prototype.setStatusBarVisibility = function (visible) {
        this._visible = visible;
        if (!this._visible) {
            this._statusBarItem.hide();
        }
        if (this._visible) {
            this._statusBarItem.show();
        }
    };
    DiagnosticBar.prototype.dispose = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this._disposables), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _dispose = _c.value;
                _dispose.dispose();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    DiagnosticBar.prototype.diagnosticChangedListener = function (diagnostic) {
        var e_2, _a;
        try {
            for (var _b = __values(diagnostic.uris), _c = _b.next(); !_c.done; _c = _b.next()) {
                var uri = _c.value;
                this.updateDiagnosticList(uri);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (vscode_1.window.activeTextEditor) {
            this._gutterDecorator.showGutterIconsForDocument(this._currentDocURI);
            this._lineDecorator.showLineDecoratorForDocument(this._currentDocURI);
            this.updateStatusbarMessage(vscode_1.window.activeTextEditor.selection.active.line);
        }
    };
    DiagnosticBar.prototype.updateDiagnosticList = function (uri) {
        var _this = this;
        var gutterIcons = [];
        var lineOpts = [];
        var issues = vscode_1.languages.getDiagnostics(uri);
        var dMessage = issues.map(function (e) {
            gutterIcons.push({
                icon: _this._gutterDecorator.getDecorator(e.severity),
                range: e.range,
            });
            lineOpts.push({
                severity: e.severity,
                message: e.message,
                range: e.range,
            });
            return {
                line: e.range.start.line,
                severity: e.severity,
                source: e.source || '',
                message: e.message,
            };
        });
        this._gutterDecorator.updateForTextDocument(uri, gutterIcons);
        this._lineDecorator.updateForTextDocument(uri, lineOpts);
        this._currentDiagnostics.set(uri.path, dMessage);
    };
    DiagnosticBar.prototype.updateStatusbarMessage = function (cursorLine) {
        var messages = this._currentDiagnostics.get(this._currentDocURI.path);
        if (!messages || messages.length === 0) {
            this._statusBarItem.hide();
            return;
        }
        var lintMessage = messages.find(function (elem) { return elem.line === cursorLine; });
        if (!!lintMessage && this._visible) {
            switch (lintMessage.severity) {
                case 0:
                    this._statusBarItem.color = this._currentColors.error;
                    this._statusBarItem.text = this._currentIcons.error + " " + lintMessage.source + " - " + lintMessage.message;
                    break;
                case 1:
                    this._statusBarItem.color = this._currentColors.warning;
                    this._statusBarItem.text = this._currentIcons.warning + " " + lintMessage.source + " - " + lintMessage.message;
                    break;
                case 2:
                    this._statusBarItem.color = this._currentColors.info;
                    this._statusBarItem.text = this._currentIcons.info + " " + lintMessage.source + " - " + lintMessage.message;
                    break;
                case 3:
                    this._statusBarItem.color = this._currentColors.hint;
                    this._statusBarItem.text = this._currentIcons.hint + " " + lintMessage.source + " - " + lintMessage.message;
                    break;
                default:
                    this._statusBarItem.text = lintMessage.source + " - " + lintMessage.message;
            }
            this._statusBarItem.show();
        }
        else {
            this._statusBarItem.hide();
        }
    };
    return DiagnosticBar;
}());
exports.DiagnosticBar = DiagnosticBar;
//# sourceMappingURL=DiagnosticBar.js.map