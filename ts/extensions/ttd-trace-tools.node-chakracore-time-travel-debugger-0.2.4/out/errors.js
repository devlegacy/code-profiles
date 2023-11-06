"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
function runtimeNotFound(_runtime) {
    return {
        id: 2001,
        format: `VSND2001', "Cannot find runtime '${_runtime}' on PATH.`,
        variables: { _runtime }
    };
}
exports.runtimeNotFound = runtimeNotFound;
function cannotLaunchInTerminal(_error) {
    return {
        id: 2011,
        format: `VSND2011', "Cannot launch debug target in terminal (${_error}).`,
        variables: { _error }
    };
}
exports.cannotLaunchInTerminal = cannotLaunchInTerminal;
function cannotLaunchDebugTarget(_error) {
    return {
        id: 2017,
        format: `VSND2017', "Cannot launch debug target (${_error}).`,
        variables: { _error },
        showUser: true,
        sendTelemetry: true
    };
}
exports.cannotLaunchDebugTarget = cannotLaunchDebugTarget;
function unknownConsoleType(consoleType) {
    return {
        id: 2028,
        format: `VSND2028', "Unknown console type '${consoleType}'.`
    };
}
exports.unknownConsoleType = unknownConsoleType;
function cannotLaunchBecauseSourceMaps(programPath) {
    return {
        id: 2002,
        format: `VSND2002', "Cannot launch program '${programPath}'; configuring source maps might help.`,
        variables: { path: programPath }
    };
}
exports.cannotLaunchBecauseSourceMaps = cannotLaunchBecauseSourceMaps;
function cannotLaunchBecauseOutFiles(programPath) {
    return {
        id: 2003,
        format: `VSND2003', "Cannot launch program '${programPath}'; setting the 'outFiles' attribute might help.`,
        variables: { path: programPath }
    };
}
exports.cannotLaunchBecauseOutFiles = cannotLaunchBecauseOutFiles;
function cannotLaunchBecauseJsNotFound(programPath) {
    return {
        id: 2009,
        format: `VSND2009', "Cannot launch program '${programPath}' because corresponding JavaScript cannot be found.`,
        variables: { path: programPath }
    };
}
exports.cannotLaunchBecauseJsNotFound = cannotLaunchBecauseJsNotFound;
function cannotLoadEnvVarsFromFile(error) {
    return {
        id: 2029,
        format: `VSND2029', "Can't load environment variables from file (${error}).`,
        variables: { _error: error }
    };
}
exports.cannotLoadEnvVarsFromFile = cannotLoadEnvVarsFromFile;
//# sourceMappingURL=errors.js.map