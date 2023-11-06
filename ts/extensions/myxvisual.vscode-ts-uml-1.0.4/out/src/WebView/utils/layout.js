"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let layout = {};
let cachedFiles;
let cachedConfig;
function resetDefaultLayout(files, config) {
    if (!files && cachedFiles)
        files = cachedFiles;
    if (!config && cachedConfig)
        config = cachedConfig;
    if (!(config && files))
        return;
    layout.contentPosition = {
        x: config.contentStyle.padding + config.fileStyle.widthPadding,
        y: config.contentStyle.padding + config.fileStyle.headerHeight + config.fileStyle.heightPadding
    };
    layout.contentScale = 1;
    let prevLeft = 0;
    let prevTop = 0;
    layout.filePositions = {};
    cachedFiles.forEach((file, index) => {
        const memberPositions = {};
        layout.filePositions[file.filename] = {
            position: { x: 0, y: prevTop },
            memberPositions
        };
        const layouts = config.showType === "export" ? file.exportLayouts : file.memberLayouts;
        try {
            for (const memberName in layouts.memberPositions) {
                const position = layouts.memberPositions[memberName];
                memberPositions[memberName] = {};
                memberPositions[memberName].position = { x: position.x, y: position.y };
            }
        }
        catch (e) { }
        prevLeft += file.fileWidth + config.fileStyle.fileOffset;
        prevTop += file.fileHeight + config.fileStyle.fileOffset;
    });
    writeStorage();
}
exports.resetDefaultLayout = resetDefaultLayout;
function getLayout(files, config) {
    const docEntryEl = document.getElementById("doc-layout");
    const JSONStr = docEntryEl.innerHTML.trim();
    let settedLayout = false;
    if (JSONStr) {
        const savedLayout = JSON.parse(JSONStr);
        if (savedLayout && savedLayout.filePositions && Object.keys(savedLayout.filePositions).length > 0) {
            layout = savedLayout;
            settedLayout = true;
        }
    }
    if (!settedLayout) {
        layout = {};
        cachedFiles = files;
        cachedConfig = config;
        resetDefaultLayout(files, config);
    }
    return layout;
}
exports.getLayout = getLayout;
function writeStorage() {
    window.vscode.postMessage({ setLayout: layout });
}
const originP = { x: 0, y: 0 };
function getContentLayout() {
    return { position: layout.contentPosition, scale: layout.contentScale };
}
exports.getContentLayout = getContentLayout;
function setContentLayout(position, scale) {
    if (position !== void 0)
        layout.contentPosition = position;
    if (scale !== void 0)
        layout.contentScale = scale;
    writeStorage();
}
exports.setContentLayout = setContentLayout;
function getContentPosition() {
    return layout.contentPosition;
}
exports.getContentPosition = getContentPosition;
function setContentPosition(position) {
    layout.contentPosition = position;
    writeStorage();
}
exports.setContentPosition = setContentPosition;
function getContentScale() {
    return layout.contentScale;
}
exports.getContentScale = getContentScale;
function setContentScale(scale) {
    layout.contentScale = scale;
    writeStorage();
}
exports.setContentScale = setContentScale;
function getFilePosition(filename) {
    const file = layout.filePositions[filename];
    return file ? file.position : originP;
}
exports.getFilePosition = getFilePosition;
function setFilePosition(filename, position) {
    try {
        layout.filePositions[filename].position = position;
    }
    catch (e) { }
    writeStorage();
}
exports.setFilePosition = setFilePosition;
function getTablePosition(filename, tableName) {
    let result = originP;
    try {
        result = layout.filePositions[filename].memberPositions[tableName].position;
    }
    catch (e) { }
    return result;
}
exports.getTablePosition = getTablePosition;
function setTablePosition(filename, tableName, position) {
    try {
        layout.filePositions[filename].memberPositions[tableName].position = position;
    }
    catch (e) { }
    writeStorage();
}
exports.setTablePosition = setTablePosition;
