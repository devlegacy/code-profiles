"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = __importStar(require("vscode"));
function activate(context) {
    var startDis = vscode.commands.registerCommand('sb.start', function () {
        vscode.window.showInformationMessage('hello from start');
    });
    var offDis = vscode.commands.registerCommand('sb.off', function () {
        vscode.window.showInformationMessage('hello from off');
    });
    context.subscriptions.push(startDis);
    context.subscriptions.push(offDis);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map