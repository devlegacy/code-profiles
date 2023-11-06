"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const reType = /(\w+)(\[\])*/i;
const findMaxLetter = (docEntry, config) => {
    const headerCount = docEntry.name.length + (docEntry.type.length > config.maxShowTypeLength ? config.maxShowTypeLength : docEntry.type.length);
    if (docEntry.members && docEntry.members.length > 0) {
        const maxCount = docEntry.members.reduce((prev, current) => {
            const letterCount = current.name ? current.name.length : 0 + (current.type ? (current.type.length > config.maxShowTypeLength ? config.maxShowTypeLength : current.type.length) : 0);
            return letterCount > prev ? letterCount : prev;
        }, 0);
        return headerCount > maxCount ? headerCount : maxCount;
    }
    else {
        return headerCount;
    }
};
const getTableWidth = (docEntry, config) => {
    const { textPadding, itemPadding } = config.tableStyle;
    return findMaxLetter(docEntry, config) * 12;
};
const getTableHeight = (docEntry, config) => {
    const { headerHeight, itemHeight } = config.tableStyle;
    return headerHeight + itemHeight * (docEntry.members ? docEntry.members.length : 0);
};
let allDocEntry = [];
function getFileDocEntries(currFileName, startRowIndex = 0, config, isInit = true) {
    if (isInit) {
        allDocEntry = [];
    }
    const alreadyHadFile = allDocEntry.some(fileDocEntry => fileDocEntry.filename && fileDocEntry.filename.toLowerCase() === currFileName.toLowerCase());
    if (alreadyHadFile)
        return;
    const _p = new Parser_1.default();
    _p.getAllLocalMembers = Boolean(config.getAllLocalMembers);
    const fileDocEntry = _p.parse(currFileName);
    setLayouts(currFileName, startRowIndex, config, fileDocEntry);
    setLayouts(currFileName, startRowIndex, config, fileDocEntry, true);
    if (fileDocEntry.filename) {
        allDocEntry.push(fileDocEntry);
    }
    return allDocEntry;
}
exports.getFileDocEntries = getFileDocEntries;
function setLayouts(currFileName, startRowIndex = 0, config, fileDocEntry, setExportLayouts = false) {
    let currMembers = fileDocEntry.members ? [...fileDocEntry.members] : [];
    if (setExportLayouts) {
        currMembers = currMembers.filter(member => {
            return fileDocEntry.exportMembers.includes(member.name);
        });
    }
    let prevFileTop = 0;
    const alreadyHadFile = allDocEntry.some(fileDocEntry => fileDocEntry.filename && fileDocEntry.filename.toLowerCase() === currFileName.toLowerCase());
    if (alreadyHadFile && !setExportLayouts)
        return;
    const memberRowDepth = {
        maxDepth: 0,
        depths: {}
    };
    function setDefaultMember(name) {
        if (!currMembers.some(member => member.name === name))
            return;
        if (memberRowDepth.depths[name] === void 0) {
            memberRowDepth.depths[name] = 0;
        }
    }
    function setMemberRef(name, refKey) {
        if (!currMembers.some(member => member.name === refKey))
            return;
        setDefaultMember(refKey);
        refKey = refKey;
        if (memberRowDepth.depths[name] === void 0 || typeof memberRowDepth.depths[name] === "number") {
            memberRowDepth.depths[name] = refKey;
        }
        else if (typeof memberRowDepth.depths[name] === "string") {
            memberRowDepth.depths[name] = [memberRowDepth.depths[name], refKey];
        }
        else if (Array.isArray(memberRowDepth.depths[name])) {
            memberRowDepth.depths[name].push(refKey);
        }
    }
    const { fileMaxDepth } = config;
    const getNewFileDocEntry = (newFileName) => {
        if (!newFileName)
            return;
        if ((typeof fileMaxDepth === "number" && startRowIndex < fileMaxDepth) || typeof fileMaxDepth !== "number") {
            if (!alreadyHadFile) {
                getFileDocEntries(newFileName, startRowIndex + 1, config, false);
            }
        }
    };
    fileDocEntry.rowIndex = startRowIndex;
    fileDocEntry.fileWidth = 0;
    fileDocEntry.fileHeight = 0;
    if (fileDocEntry.resolvedModules) {
        fileDocEntry.resolvedModules.forEach(({ resolvedFileName, isExternalLibraryImport }) => {
            if (resolvedFileName && !isExternalLibraryImport) {
                getNewFileDocEntry(resolvedFileName);
            }
        });
    }
    if (currMembers) {
        currMembers.forEach((memberDocEntry, index) => {
            const { members, type } = memberDocEntry;
            setDefaultMember(memberDocEntry.name);
            memberDocEntry.columnIndex = index;
            memberDocEntry.tableWidth = getTableWidth(memberDocEntry, config);
            memberDocEntry.tableHeight = getTableHeight(memberDocEntry, config);
            if (memberDocEntry.extends) {
                memberDocEntry.extends.forEach(member => {
                    const { escapedName, name } = member;
                    const typeName = escapedName || name;
                    if (typeName === "Component") {
                        const reComponent = /(?:React\.)?(?:Component)\<?((\w+\,?\s?)+)\>?/im;
                        const result = reComponent.exec(memberDocEntry.valueDeclarationText);
                        if (result[1]) {
                            const statePropsTypes = result[1].split(",").map(str => str.trim());
                            statePropsTypes.forEach(statePropsType => {
                                setDefaultMember(statePropsType);
                                setMemberRef(memberDocEntry.name, statePropsType);
                            });
                        }
                    }
                    else {
                        setMemberRef(memberDocEntry.name, typeName);
                    }
                });
            }
            if (type === "Interface" || type === "Class") {
                if (!members)
                    return;
                members.forEach((member, index) => {
                    const escapedName = reType.test(member.type) ? member.type.match(reType)[1] : member.name;
                    let localIndex = -1;
                    if (escapedName) {
                        for (const index in fileDocEntry.locals) {
                            if (fileDocEntry.locals[index].name === escapedName) {
                                localIndex = Number(index);
                                setDefaultMember(escapedName);
                                setMemberRef(memberDocEntry.name, escapedName);
                                break;
                            }
                        }
                    }
                    if (localIndex > -1) {
                        const { filename } = fileDocEntry.locals[localIndex];
                        member.filename = filename;
                        member.isRef = true;
                        getNewFileDocEntry(filename);
                    }
                });
            }
        });
        const memberNames = Object.keys(memberRowDepth.depths);
        while (memberNames.some(key => typeof memberRowDepth.depths[key] !== "number")) {
            memberNames.forEach(key => {
                const refKey = memberRowDepth.depths[key];
                if (refKey === 0) {
                }
                else if (typeof refKey === "string") {
                    if (typeof memberRowDepth.depths[refKey] === "number") {
                        memberRowDepth.depths[key] = memberRowDepth.depths[refKey] + 1;
                    }
                }
                else if (Array.isArray(refKey)) {
                    if (refKey.some(key => typeof key === "string")) {
                        refKey.forEach((newKey, index) => {
                            if (typeof newKey === "string") {
                                if (typeof memberRowDepth.depths[newKey] === "number") {
                                    memberRowDepth.depths[key][index] = memberRowDepth.depths[newKey] + 1;
                                }
                            }
                        });
                    }
                    else {
                        memberRowDepth.depths[key] = refKey.reduce((prev, current) => current > prev ? current : prev, 0);
                    }
                }
            });
        }
        memberRowDepth.maxDepth = memberNames.map(key => memberRowDepth[key]).reduce((prev, current) => current > prev ? current : prev, 0);
        function getTableRect(memberName) {
            let result = { tableWidth: 0, tableHeight: 0 };
            if (fileDocEntry && currMembers) {
                for (const member of currMembers) {
                    if (member.name === memberName) {
                        result = { tableWidth: member.tableWidth, tableHeight: member.tableHeight };
                        break;
                    }
                }
            }
            return result;
        }
        const memberLayouts = {
            memberPositions: {},
            rows: []
        };
        memberNames.forEach((memberName, index) => {
            const memberRowIndex = memberRowDepth.depths[memberName];
            if (memberLayouts.rows[memberRowIndex] === void 0) {
                memberLayouts.rows[memberRowIndex] = {
                    heihgt: -config.fileStyle.tableOffset,
                    maxWidth: 0,
                    maxCloumn: -1
                };
            }
            const rect = getTableRect(memberName);
            memberLayouts.memberPositions[memberName] = { x: 0, y: (prevFileTop + config.fileStyle.headerHeight + config.fileStyle.heightPadding) + (memberLayouts.rows[memberRowIndex].heihgt + config.fileStyle.tableOffset), rowIndex: memberRowIndex };
            memberLayouts.rows[memberRowIndex].heihgt += rect.tableHeight + config.fileStyle.tableOffset;
            memberLayouts.rows[memberRowIndex].maxCloumn += 1;
            if (rect.tableWidth > memberLayouts.rows[memberRowIndex].maxWidth) {
                memberLayouts.rows[memberRowIndex].maxWidth = rect.tableWidth;
            }
        });
        for (const memberName in memberLayouts.memberPositions) {
            const position = memberLayouts.memberPositions[memberName];
            position.x = (position.rowIndex === 0 ? 0 : (memberLayouts.rows.slice(0, position.rowIndex).reduce((prev, current) => prev + current.maxWidth, 0))) + position.rowIndex * config.fileStyle.tableOffset;
        }
        fileDocEntry.fileHeight += memberLayouts.rows.reduce((prev, current) => prev < current.heihgt ? current.heihgt : prev, 0) + (config.fileStyle.headerHeight + config.fileStyle.heightPadding * 2);
        fileDocEntry.fileWidth += memberLayouts.rows.reduce((prev, current) => prev + current.maxWidth, 0) + (config.fileStyle.tableOffset * (memberRowDepth.maxDepth) + config.fileStyle.widthPadding * 2);
        if (setExportLayouts) {
            fileDocEntry.exportLayouts = memberLayouts;
        }
        else {
            fileDocEntry.memberLayouts = memberLayouts;
        }
        prevFileTop = fileDocEntry.fileHeight + config.fileStyle.fileOffset;
    }
    else {
        fileDocEntry.fileHeight = config.fileStyle.headerHeight;
        fileDocEntry.fileWidth = 500;
    }
}
exports.setLayouts = setLayouts;
exports.default = getFileDocEntries;
