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
const SingleFile_1 = require("./SingleFile");
const getConnectPathString_1 = require("../utils/getConnectPathString");
const layout_1 = require("../utils/layout");
class Content extends React.Component {
    constructor() {
        super(...arguments);
        this.singleFiles = [];
        this.readAllFilesByDepth = () => {
        };
        this._isMounted = false;
        this.drawLines = (isCallback = true) => {
            if (isCallback) {
                if (!this._isMounted)
                    return;
            }
            const { fileDocEntries } = this.props;
            while (this.pathGroupEl.firstChild) {
                this.pathGroupEl.removeChild(this.pathGroupEl.firstChild);
            }
            const allTypeInOuts = this.singleFiles.map((singleFile, index) => {
                const typeInOuts = singleFile.getTypeInOuts();
                return typeInOuts;
            });
            allTypeInOuts.forEach((typeInOuts, index) => {
                typeInOuts.forEach((typeInOut, x) => {
                    const { typeOuts } = typeInOut;
                    typeOuts.forEach((typeOut, y) => {
                        const { leftPosition, rightPosition, toFileType } = typeOut;
                        const { isLocal, filename, escapedName } = toFileType;
                        if (isLocal) {
                            const typeInOutSize = typeInOuts.length;
                            for (let z = 0; z < typeInOutSize; z++) {
                                const { typeIn } = typeInOuts[z];
                                if (escapedName === typeInOut.typeIn.name) {
                                    this.insertPath(leftPosition, typeInOut.typeIn.leftPosition);
                                }
                                else if (typeIn.name === escapedName) {
                                    this.insertPath(leftPosition, typeIn.rightPosition);
                                    break;
                                }
                            }
                        }
                        else if (filename) {
                            const allFileSize = fileDocEntries.length;
                            for (let fileIndex = 0; fileIndex < allFileSize; fileIndex++) {
                                if (fileDocEntries[fileIndex].filename === filename) {
                                    const typeInOuts = allTypeInOuts[fileIndex];
                                    const typeInOutSize = typeInOuts.length;
                                    for (let z = 0; z < typeInOutSize; z++) {
                                        const { typeIn } = typeInOuts[z];
                                        if (typeIn.name === escapedName) {
                                            this.insertPath(leftPosition, typeIn.rightPosition);
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    });
                });
            });
            this._isMounted = true;
        };
        this.insertPath = (startPosition, endPosition) => {
            const { color, strokeDasharray } = this.context.config.connectPathStyle;
            const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            svgPath.setAttributeNS(null, "d", getConnectPathString_1.getConnectPathString(startPosition, endPosition));
            svgPath.setAttributeNS(null, "stroke", color);
            svgPath.setAttributeNS(null, "stroke-opacity", ".5");
            svgPath.setAttributeNS(null, "stroke-dasharray", strokeDasharray);
            svgPath.setAttributeNS(null, "marker-start", "url(#arrowStart)");
            svgPath.setAttributeNS(null, "fill", "none");
            this.pathGroupEl.appendChild(svgPath);
        };
        this.originDocEntrie = [...this.props.fileDocEntries];
    }
    componentWillMount() {
        this.readAllFilesByDepth();
    }
    componentDidMount() {
        this.drawLines(false);
    }
    componentDidUpdate() {
        this.drawLines(false);
    }
    render() {
        const _a = this.props, { fileDocEntries, children } = _a, attributes = __rest(_a, ["fileDocEntries", "children"]);
        for (const docEntry of fileDocEntries) {
            if (this.context.config.showType === "export") {
                docEntry["originMembers"] = docEntry.members;
                docEntry.members = docEntry.members.filter(member => docEntry.exportMembers.includes(member.name));
            }
            else {
                if (docEntry["originMembers"]) {
                    docEntry.members = docEntry["originMembers"];
                }
            }
        }
        this.singleFiles = [];
        const layout = layout_1.getLayout(fileDocEntries, this.context.config);
        const contentLayout = { position: layout.contentPosition, scale: layout.contentScale };
        return (React.createElement("g", { transform: `translate(${contentLayout.position.x}, ${contentLayout.position.y}) scale(${layout.contentScale})`, scale: contentLayout.scale, ref: rootEl => this.rootEl = rootEl },
            fileDocEntries && fileDocEntries.map((fileDocEntry, index) => {
                const position = layout_1.getFilePosition(fileDocEntry.filename);
                return (React.createElement(SingleFile_1.default, Object.assign({}, fileDocEntry, { ref: singleFile => this.singleFiles[index] = singleFile, key: index, fileWidth: fileDocEntry.fileWidth, transform: `translate(${position.x}, ${position.y})`, onChangeView: position => {
                        this.drawLines(true);
                        layout_1.setFilePosition(fileDocEntry.filename, position);
                    } })));
            }),
            React.createElement("g", { ref: pathGroupEl => this.pathGroupEl = pathGroupEl })));
    }
}
Content.contextTypes = { config: PropTypes.object };
exports.Content = Content;
exports.default = Content;
