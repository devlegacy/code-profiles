"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
function activate(context) {
    const pendingLaunchMap = new Map();
    vscode.debug.onDidReceiveDebugSessionCustomEvent((e) => {
        if (e.event !== 'ttdLaunch') {
            return;
        }
        try {
            if (e.body.state === 'start') {
                vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: 'TTD Launch Status' }, p => {
                    return new Promise((resolve, reject) => {
                        p.report({ message: 'TTD: Configuring Time-Travel Trace.' });
                        pendingLaunchMap.set(e.body.id, [
                            (msg) => p.report({ message: msg }),
                            () => resolve()
                        ]);
                    });
                });
            }
            else if (e.body.state === 'write') {
                (pendingLaunchMap.get(e.body.id)[0])('TTD: Writing Time-Travel Trace.');
            }
            else if (e.body.state === 'complete') {
                if (e.body.payload.launch) {
                    (pendingLaunchMap.get(e.body.id)[0])('TTD: Launching Time-Travel Debug Configuration.');
                    vscode.debug.startDebugging(undefined, e.body.payload.config).then(() => {
                        (pendingLaunchMap.get(e.body.id)[1])();
                        pendingLaunchMap.delete(e.body.id);
                    });
                }
                else {
                    (pendingLaunchMap.get(e.body.id)[0])('TTD: Launch Aborted!');
                    (pendingLaunchMap.get(e.body.id)[1])();
                    pendingLaunchMap.delete(e.body.id);
                }
            }
            else {
                // e.body.state === 'fail'
                (pendingLaunchMap.get(e.body.id)[1])();
                pendingLaunchMap.delete(e.body.id);
                let msg = '';
                if (e.body && e.body.payload) {
                    msg = ' -- ' + JSON.stringify(e.body.payload);
                }
                vscode.window.showErrorMessage('TTD: Failed to launch time-travel debugging session' + msg);
            }
        }
        catch (ex) {
            ;
        }
    });
    const provider = new NodeDebugTTDConfigurationProvider();
    context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('node-chakracore-time-travel-debugger', provider));
    context.subscriptions.push(provider);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
class NodeDebugTTDConfigurationProvider {
    resolveDebugConfiguration(folder, config, token) {
        config.protocol = 'inspector';
        if (process.platform === 'win32') {
            config.runtimeExecutable = path.join(__dirname, '../nodebins/win32/node.exe');
        }
        else if (process.platform === 'linux') {
            config.runtimeExecutable = path.join(__dirname, '../nodebins/linux/node.exe');
        }
        else {
            config.runtimeExecutable = path.join(__dirname, '../nodebins/darwin/node');
        }
        config.runtimeArgs = [
            '--tt-debug',
            '--disable-auto-trace'
        ];
        config.console = "internalConsole";
        return config;
    }
    dispose() {
    }
}
//# sourceMappingURL=extension.js.map