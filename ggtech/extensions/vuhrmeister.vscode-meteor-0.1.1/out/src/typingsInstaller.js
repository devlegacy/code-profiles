"use strict";
var vscode_1 = require('vscode');
var path = require('path');
var jetpack = require('fs-jetpack');
// VS Code shows an error when having a typings folder. So we name it a bit different.
// Should be changed to 'typings' asap (https://github.com/Microsoft/vscode/issues/8493)
var TYPINGS_PATH_SRC = 'meteor-typings';
var TYPINGS_PATH_DEST = '.vscode/typings';
var METEOR_TYPINGS_FILE = 'meteor.d.ts';
var TypingsInstaller = (function () {
    function TypingsInstaller(extensionPath) {
        this.extensionPath = extensionPath;
    }
    TypingsInstaller.prototype.install = function () {
        var src = jetpack.cwd(path.resolve(this.extensionPath, TYPINGS_PATH_SRC));
        var dest = jetpack.cwd(path.join(vscode_1.workspace.rootPath, TYPINGS_PATH_DEST));
        // Just copy, even if it exists. Checking for existens first shouldn't make it faster.
        src.copy(METEOR_TYPINGS_FILE, dest.path(METEOR_TYPINGS_FILE), { overwrite: true });
    };
    return TypingsInstaller;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TypingsInstaller;
//# sourceMappingURL=typingsInstaller.js.map