'use strict';
var vscode_1 = require('vscode');
var path = require('path');
var jetpack = require('fs-jetpack');
var typingsInstaller_1 = require('./typingsInstaller');
var METEOR_DIR = '.meteor';
function activate(context) {
    // Only activate if it's a Meteor project
    if (!jetpack.exists(path.join(vscode_1.workspace.rootPath, METEOR_DIR))) {
        return;
    }
    var typingsInstaller = new typingsInstaller_1.default(context.extensionPath);
    typingsInstaller.install();
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map