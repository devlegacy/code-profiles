"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_chrome_debug_core_1 = require("vscode-chrome-debug-core");
const path = require("path");
const os = require("os");
const nodeDebugTTDAdapter_1 = require("./nodeDebugTTDAdapter");
vscode_chrome_debug_core_1.ChromeDebugSession.run(vscode_chrome_debug_core_1.ChromeDebugSession.getSession({
    logFilePath: path.join(os.tmpdir(), 'node-chakracore-time-travel-debugger.txt'),
    adapter: nodeDebugTTDAdapter_1.NodeDebugTTDAdapter,
    extensionName: 'node-chakracore-time-travel-debugger',
    enableSourceMapCaching: true
}));
/* tslint:disable:no-var-requires */
vscode_chrome_debug_core_1.logger.log('node-chakracore-time-travel-debugger: ' + require('../package.json').version);
//# sourceMappingURL=nodeDebugTTD.js.map