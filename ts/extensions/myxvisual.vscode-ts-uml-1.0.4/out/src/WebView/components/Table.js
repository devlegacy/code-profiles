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
const addDragToSVGElement_1 = require("../utils/addDragToSVGElement");
class Table extends React.Component {
    componentDidMount() {
        addDragToSVGElement_1.addDragToSVGElement(this.dragEl, this.rootEl, this.props.onChangeView);
    }
    render() {
        const _a = this.props, { name, type, members, tableWidth, onChangeView, columnIndex, tableHeight, valueDeclarationText, escapedName, initializerText } = _a, attributes = __rest(_a, ["name", "type", "members", "tableWidth", "onChangeView", "columnIndex", "tableHeight", "valueDeclarationText", "escapedName", "initializerText"]);
        const { config } = this.context;
        const { theme, tableStyle } = config;
        const { itemHeight, itemPadding, headerFontSize, itemFontSize, headerHeight } = tableStyle;
        return (React.createElement("g", Object.assign({}, attributes, { ref: rootEl => this.rootEl = rootEl }),
            React.createElement("rect", { ref: dragEl => this.dragEl = dragEl, fill: theme.accent, fillOpacity: 1, width: tableWidth, height: headerHeight, style: { cursor: "move" } }),
            React.createElement("text", { fill: "#fff", fontSize: headerFontSize, pointerEvents: "none" },
                React.createElement("tspan", { x: itemPadding, y: itemPadding + itemFontSize }, name),
                React.createElement("tspan", { fill: "rgba(255, 255, 255, .75)", textAnchor: "end", x: tableWidth - itemPadding, y: itemPadding + itemFontSize }, type.slice(0, config.maxShowTypeLength))),
            React.createElement("g", { fontSize: itemFontSize }, members && members.map((item, index) => {
                const { name, type, isRequired } = item;
                const middleY = (itemHeight - itemFontSize) / 2 + itemFontSize;
                return (React.createElement("g", { transform: `translate(0, ${itemHeight * (1 + index) + headerHeight - itemHeight})`, key: index },
                    React.createElement("rect", { fill: "#fff", width: tableWidth, height: itemHeight }),
                    React.createElement("text", { fill: "#000", fontSize: itemFontSize },
                        React.createElement("tspan", { x: itemPadding, y: middleY }, name),
                        React.createElement("tspan", { fill: "#666", textAnchor: "end", x: tableWidth - itemPadding, y: middleY }, `${isRequired ? ":" : "?:"}${type.length > config.maxShowTypeLength ? type.slice(0, config.maxShowTypeLength) : type}`))));
            }))));
    }
}
Table.contextTypes = { config: PropTypes.object };
exports.Table = Table;
exports.default = Table;
