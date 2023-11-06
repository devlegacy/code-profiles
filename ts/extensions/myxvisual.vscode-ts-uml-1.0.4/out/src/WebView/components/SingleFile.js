"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PropTypes = require("prop-types");
const Table_1 = require("./Table");
const getTransform_1 = require("../utils/getTransform");
const addDragToSVGElement_1 = require("../utils/addDragToSVGElement");
const layout_1 = require("../utils/layout");
const originOffsetX = -20;
const reType = /(\w+)(\[\])*/i;
class SingleFile extends React.Component {
    constructor() {
        super(...arguments);
        this.tables = [];
        this.hue = Math.random() * 255;
        this.backgroundRect = {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        };
        this.typeInOuts = [];
        this.docEntries = [];
        this.getFileTranslate = () => {
            const transform = this.rootEl.getAttributeNS(null, "transform");
            const position = getTransform_1.getTranslate(transform);
            return position;
        };
        this.getSVGRootTranslate = () => {
            if (!this.rootEl) {
                const contentLayout = layout_1.getContentLayout();
                return { x: contentLayout.position.x, y: contentLayout.position.y };
            }
            const boardEl = this.rootEl.parentElement;
            const boardTranslate = getTransform_1.getTranslate(boardEl.getAttributeNS(null, "transform")) || { x: 0, y: 0 };
            return boardTranslate;
        };
        this.getTypeInOuts = () => {
            const { locals } = this.props;
            const { headerHeight, itemHeight } = this.context.config.tableStyle;
            this.screenMatrix = this.tablesContainer.getCTM();
            const boardTranslate = this.getSVGRootTranslate();
            if (!this.docEntries)
                return [];
            this.docEntries.forEach((docEntry, index) => {
                const { members, type, filename, name, tableWidth } = docEntry;
                const table = this.tables[index];
                const tableRect = table ? table.rootEl.getBoundingClientRect() : { left: 0, top: 0 };
                const typeOuts = [];
                let leftX = tableRect.left - boardTranslate.x + originOffsetX;
                leftX = leftX / this.screenMatrix.a;
                let rightX = leftX + tableWidth;
                let y = tableRect.top / this.screenMatrix.d + headerHeight / 2 - boardTranslate.y / this.screenMatrix.d;
                const typeInOutFile = {
                    typeIn: {
                        name,
                        leftPosition: {
                            x: leftX,
                            y
                        },
                        rightPosition: {
                            x: rightX,
                            y
                        },
                        type,
                        filename
                    },
                    typeOuts
                };
                this.typeInOuts[index] = typeInOutFile;
                if (members) {
                    members.forEach((member, index) => {
                        const escapedName = reType.test(member.type) ? member.type.match(reType)[1] : member.name;
                        let localIndex = -1;
                        if (escapedName) {
                            for (const index in locals) {
                                if (locals[index].name === escapedName) {
                                    localIndex = Number(index);
                                    break;
                                }
                            }
                        }
                        const y = tableRect.top / this.screenMatrix.d + headerHeight + itemHeight * index + itemHeight / 2 - boardTranslate.y / this.screenMatrix.d;
                        typeOuts[index] = {
                            leftPosition: {
                                x: leftX,
                                y
                            },
                            rightPosition: {
                                x: rightX,
                                y
                            },
                            toFileType: {
                                isLocal: localIndex > -1 ? (!locals[localIndex].filename) : false,
                                escapedName,
                                type: member.type,
                                filename: localIndex > -1 ? locals[localIndex].filename : void 0
                            }
                        };
                    });
                }
                const memberSize = docEntry.members ? docEntry.members.length : 0;
                const setPosition = (targetIndex, escapedName, type) => {
                    let localIndex = -1;
                    if (escapedName) {
                        for (const index in locals) {
                            if (locals[index].name === escapedName) {
                                localIndex = Number(index);
                                break;
                            }
                        }
                    }
                    typeOuts[targetIndex + memberSize] = {
                        leftPosition: {
                            x: leftX,
                            y
                        },
                        rightPosition: {
                            x: rightX,
                            y
                        },
                        toFileType: {
                            isLocal: localIndex > -1 ? (!locals[localIndex].filename) : false,
                            escapedName,
                            type,
                            filename: localIndex > -1 ? locals[localIndex].filename : void 0
                        }
                    };
                };
                if (docEntry.extends) {
                    let index = 0;
                    let targetIndex = 0;
                    const extendsSize = docEntry.extends.length;
                    while (index < extendsSize) {
                        const extendsItem = docEntry.extends[index];
                        const escapedName = reType.test(extendsItem.name) ? extendsItem.name.match(reType)[1] : extendsItem.name;
                        if (escapedName === "Component") {
                            const reComponent = /(?:React\.)?(?:Component)\<?((\w+\,?\s?)+)\>?/im;
                            const result = reComponent.exec(docEntry.valueDeclarationText);
                            if (result[1]) {
                                const escapedNames = result[1].split(",").map(str => str.trim());
                                setPosition(targetIndex, escapedNames[0], extendsItem.type);
                                targetIndex += 1;
                                setPosition(targetIndex, escapedNames[1], extendsItem.type);
                            }
                        }
                        else {
                            setPosition(targetIndex, escapedName, extendsItem.type);
                        }
                        index += 1;
                        targetIndex += 1;
                    }
                }
            });
            return this.typeInOuts;
        };
        this.getAllExportDocEntry = (exportDocEntry) => {
            const { members } = this.props;
            let index = -1;
            if (members) {
                for (let i = 0; i < members.length; i++) {
                    if (members[i].name === exportDocEntry.name) {
                        index = i;
                        break;
                    }
                }
            }
            return index > -1 ? members[index] : exportDocEntry;
        };
        this.findMaxLetter = (docEntry) => {
            const headerCount = docEntry.name.length + docEntry.type.length;
            if (docEntry.members && docEntry.members.length > 0) {
                const maxCount = docEntry.members.reduce((prev, current) => {
                    const letterCount = current.name ? current.name.length : 0 + current.type ? current.type.length : 0;
                    return letterCount > prev ? letterCount : prev;
                }, 0);
                return headerCount > maxCount ? headerCount : maxCount;
            }
            else {
                return headerCount;
            }
        };
        this.handleChangeTableView = (isCallback = true) => {
            const { onChangeView } = this.props;
            if (onChangeView) {
                onChangeView(this.getFileTranslate());
            }
            this.redrawDOM();
        };
        this.redrawDOM = () => {
            const { members, fileWidth, fileHeight } = this.props;
            const hadMembers = members && members.length > 0;
            const tablesRect = this.tablesContainer.getBoundingClientRect();
            const { widthPadding, headerHeight, heightPadding, headerFontSize } = this.context.config.fileStyle;
            this.wrapperEl.setAttributeNS(null, "display", "none");
            const x = -widthPadding;
            const y = -headerHeight - heightPadding;
            this.screenMatrix = this.tablesContainer.getCTM();
            const width = hadMembers ? `${tablesRect.width / this.screenMatrix.a + widthPadding * 2}` : `${fileWidth}`;
            const height = hadMembers ? `${tablesRect.height / this.screenMatrix.d + heightPadding * 2 + headerHeight}` : `${fileHeight}`;
            this.headerEl.setAttributeNS(null, "transform", `translate(${x}, ${y})`);
            this.headerEl.setAttributeNS(null, "width", width);
            this.backgroundEl.setAttributeNS(null, "transform", `translate(${x}, ${y})`);
            this.backgroundEl.setAttributeNS(null, "width", width);
            this.backgroundEl.setAttributeNS(null, "height", height);
            this.headerTextEl.setAttributeNS(null, "transform", `translate(${x + 4}, ${y + (headerHeight + headerFontSize) / 2})`);
            const wrapperRect = this.wrapperEl.getBoundingClientRect();
            const offsetX = (tablesRect.left - wrapperRect.left) / this.screenMatrix.a + x;
            const offsetY = (tablesRect.top - wrapperRect.top) / this.screenMatrix.d + y;
            this.wrapperEl.setAttributeNS(null, "display", "");
            this.wrapperEl.setAttributeNS(null, "transform", `translate(${offsetX}, ${offsetY})`);
        };
    }
    componentDidMount() {
        this.originTablesRect = this.tablesContainer.getBoundingClientRect();
        this.originRootTranslate = this.getSVGRootTranslate();
        addDragToSVGElement_1.addDragToSVGElement(this.headerEl, this.rootEl, this.props.onChangeView);
        this.screenMatrix = this.tablesContainer.getCTM();
        this.redrawDOM();
    }
    componentDidUpdate() {
        this.redrawDOM();
    }
    render() {
        let _a = this.props, { name, filename, members, exports, resolvedModules, onChangeView, rowIndex, fileWidth, fileHeight, valueDeclarationText, memberLayouts, exportLayouts, escapedName, exportMembers, originMembers } = _a, attributes = __rest(_a, ["name", "filename", "members", "exports", "resolvedModules", "onChangeView", "rowIndex", "fileWidth", "fileHeight", "valueDeclarationText", "memberLayouts", "exportLayouts", "escapedName", "exportMembers", "originMembers"]);
        const { config } = this.context;
        const justShowExport = config.showType === "export";
        this.typeInOuts = [];
        const { headerFontSize, headerHeight } = this.context.config.fileStyle;
        if (exports) {
            exports = exports
                .map(exportDocEntry => this.getAllExportDocEntry(exportDocEntry))
                .filter(docEntry => docEntry.name !== "default");
        }
        const docEntries = justShowExport ? exports : members;
        this.docEntries = docEntries;
        const x = 0;
        const y = 0;
        return (React.createElement("g", Object.assign({ ref: rootEl => this.rootEl = rootEl }, attributes),
            React.createElement("g", { ref: wrapperEl => this.wrapperEl = wrapperEl, display: "none" },
                React.createElement("rect", { width: fileWidth, height: fileHeight, fill: "#e5e5e5", stroke: config.theme.accent, pointerEvents: "none", ref: backgroundEl => this.backgroundEl = backgroundEl, transform: `translate(${x}, ${y})` }),
                React.createElement("rect", { cursor: "move", width: fileWidth, height: headerHeight, transform: `translate(${x}, ${y})`, ref: headerEl => this.headerEl = headerEl, fill: "#000" }),
                React.createElement("text", { x: "0", y: "0", fill: "#fff", fontSize: headerFontSize, pointerEvents: "none", transform: `translate(${x + 4}, ${y + (headerHeight + headerFontSize) / 2})`, ref: headerTextEl => this.headerTextEl = headerTextEl }, filename)),
            React.createElement("g", { ref: tablesContainer => this.tablesContainer = tablesContainer }, docEntries && docEntries.map((docEntry, index) => {
                const position = layout_1.getTablePosition(filename, docEntry.name);
                return (React.createElement(Table_1.default, Object.assign({}, (justShowExport ? this.getAllExportDocEntry(docEntry) : docEntry), { onChangeView: (position) => {
                        this.handleChangeTableView();
                        layout_1.setTablePosition(filename, docEntry.name, position);
                    }, ref: table => this.tables[index] = table, key: index, transform: `translate(${position.x}, ${position.y})` })));
            }))));
    }
}
SingleFile.contextTypes = { config: PropTypes.object };
exports.SingleFile = SingleFile;
exports.default = SingleFile;
