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
const path = require("path");
const vscode = require("vscode");
const fs = require("fs");
const md5 = require("md5");
const getFileDocEntries_1 = require("./getFileDocEntries");
const config_1 = require("./config");
const entryFileName = path.join(__dirname, "./entryFile.json");
let title = "TypeScript UML";
let docEntries;
let saveData = getSaveFileData();
let globalPanel;
let globalExtensionPath;
let prevMd5 = null;
function watchFile() {
    if (fs.existsSync(saveData.entryFile)) {
        if (!prevMd5) {
            prevMd5 = md5(fs.readFileSync(saveData.entryFile));
        }
        fs.watchFile(saveData.entryFile, (eventType, filename) => {
            if (filename) {
                const currMd5 = md5(fs.readFileSync(saveData.entryFile));
                if (currMd5 !== prevMd5) {
                    UMLWebviewPanel.revive(globalPanel, globalExtensionPath);
                    prevMd5 = currMd5;
                }
            }
        });
    }
}
exports.watchFile = watchFile;
function activate(context) {
    let newFile = "";
    function commandCallback(fileUri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fileUri !== void 0) {
                if (typeof fileUri === "string") {
                    newFile = fileUri;
                }
                else if (typeof fileUri === "object" && fileUri.path) {
                    newFile = fileUri.path;
                }
            }
            else {
                newFile = "";
                const { activeTextEditor } = vscode.window;
                if (activeTextEditor) {
                    if (!newFile && activeTextEditor && activeTextEditor.document) {
                        newFile = activeTextEditor.document.fileName;
                    }
                }
            }
            newFile = path.normalize(newFile);
            if (process.platform === "win32" && newFile.startsWith("\\")) {
                newFile = newFile.slice(1);
            }
            if (newFile !== saveData.entryFile) {
                saveData.entryFile = newFile;
                saveData.layout = "";
            }
            fs.unwatchFile(saveData.entryFile);
            watchFile();
            UMLWebviewPanel.createOrShow(context.extensionPath);
        });
    }
    context.subscriptions.push(vscode.commands.registerCommand('tsUML.showFile', commandCallback));
    context.subscriptions.push(vscode.commands.registerCommand('tsUML.showFolder', commandCallback));
    if (vscode.window.registerWebviewPanelSerializer) {
        vscode.window.registerWebviewPanelSerializer(UMLWebviewPanel.viewType, {
            deserializeWebviewPanel(webviewPanel, state) {
                return __awaiter(this, void 0, void 0, function* () {
                    globalPanel = webviewPanel;
                    globalExtensionPath = context.extensionPath;
                    UMLWebviewPanel.revive(webviewPanel, context.extensionPath);
                });
            }
        });
    }
}
exports.activate = activate;
class UMLWebviewPanel {
    constructor(panel, extensionPath) {
        this._disposables = [];
        this._panel = panel;
        this._extensionPath = extensionPath;
        this._update();
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        this._panel.onDidChangeViewState(e => {
            if (this._panel.visible) {
            }
        }, null, this._disposables);
    }
    static createOrShow(extensionPath) {
        const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        if (UMLWebviewPanel.currentPanel) {
            UMLWebviewPanel.currentPanel._panel.reveal(column);
            UMLWebviewPanel.currentPanel._update();
            return;
        }
        const panel = vscode.window.createWebviewPanel(UMLWebviewPanel.viewType, title, column || vscode.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(extensionPath, 'media')),
                vscode.Uri.file(path.join(extensionPath, 'build')),
                vscode.Uri.file(path.join(extensionPath, 'icons'))
            ]
        });
        addDidReceiveMessage(panel);
        globalPanel = panel;
        globalExtensionPath = extensionPath;
        UMLWebviewPanel.currentPanel = new UMLWebviewPanel(panel, extensionPath);
    }
    static revive(panel, extensionPath) {
        UMLWebviewPanel.currentPanel = new UMLWebviewPanel(panel, extensionPath);
    }
    dispose() {
        UMLWebviewPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    _update() {
        this._panel.webview.html = this._getHtmlForWebview();
    }
    _getHtmlForWebview() {
        const nonce = getNonce();
        const favicon = vscode.Uri.file(path.join(this._extensionPath, 'icons/ts.png'));
        const faviconUri = favicon.with({ scheme: 'vscode-resource' });
        const appScript = vscode.Uri.file(path.join(this._extensionPath, 'build/js/app.js'));
        const appUri = appScript.with({ scheme: 'vscode-resource' });
        const vendorScript = vscode.Uri.file(path.join(this._extensionPath, 'build/js/vendor.js'));
        const vendorUri = vendorScript.with({ scheme: 'vscode-resource' });
        if (saveData.entryFile) {
            docEntries = getFileDocEntries_1.default(saveData.entryFile, 0, config_1.default);
        }
        let layoutStr = JSON.stringify(saveData.layout);
        saveDataToFile();
        addDidReceiveMessage(this._panel);
        const htmlStr = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${title}</title>
                <link rel="icon" type="image/png" sizes="32x32" href="${faviconUri}">
            </head>
            <body>
                <span id="doc-layout" style="display: none;">${layoutStr}</span>
                <div id="app"></div>
                <script nonce="${nonce}" type="text/javascript" src="${appUri}" charset="utf-8"></script>
                <script nonce="${nonce}" type="text/javascript" src="${vendorUri}" charset="utf-8"></script>
            </body>
            </html>`;
        return htmlStr;
    }
}
UMLWebviewPanel.viewType = "tsUML";
function addDidReceiveMessage(panel) {
    let saveDataTimer = null;
    panel.webview.onDidReceiveMessage(message => {
        if (message.boardWillMount) {
            panel.webview.postMessage({ docEntries });
        }
        if (message.getLayout) {
            panel.webview.postMessage({ layout: saveData.layout });
        }
        if (message.error) {
            console.error(message.error);
        }
        if (message.setLayout) {
            saveData.layout = message.setLayout;
            clearTimeout(saveDataTimer);
            saveDataTimer = setTimeout(saveDataToFile, 200);
        }
    });
}
function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function saveDataToFile() {
    fs.writeFileSync(entryFileName, JSON.stringify(saveData, null, 2), { encoding: "utf8" });
}
function getSaveFileData() {
    let data = { entryFile: "", layout: "" };
    if (fs.existsSync(entryFileName)) {
        try {
            data = JSON.parse(fs.readFileSync(entryFileName, { encoding: "utf8" }));
        }
        catch (e) { }
    }
    return data;
}
