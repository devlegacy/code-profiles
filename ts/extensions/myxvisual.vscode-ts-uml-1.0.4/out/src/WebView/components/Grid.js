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
class Grid extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            offsetX: 0,
            offsetY: 0,
            scale: 1,
            currGridWidth: this.props.gridWidth,
            currGridHeight: this.props.gridHeight
        };
    }
    render() {
        const _a = this.props, { gridWidth: gridWitdh, gridHeight, lineColor, gridSize, griItemCount } = _a, attributes = __rest(_a, ["gridWidth", "gridHeight", "lineColor", "gridSize", "griItemCount"]);
        const { offsetX, offsetY, scale, currGridWidth: currGridWidth, currGridHeight } = this.state;
        const rootStyle = {
            position: "fixed",
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none"
        };
        let rowMaxCount = currGridWidth / scale / gridSize;
        rowMaxCount = Number.isInteger(rowMaxCount) ? rowMaxCount + 1 : Math.ceil(rowMaxCount);
        return (React.createElement("svg", Object.assign({ transform: `translate(${offsetX % (gridSize * scale)}, ${offsetY % (gridSize * scale)})` }, attributes, { style: rootStyle }),
            Array(rowMaxCount * 10).fill(0).map((zero, index) => {
                const x = index * (gridSize / griItemCount);
                const strokeWidth = .2 / scale;
                return [
                    React.createElement("line", { x1: x, y1: "0", x2: x, y2: currGridHeight, stroke: lineColor, strokeOpacity: .5, strokeWidth: strokeWidth }),
                    React.createElement("line", { x1: "0", y1: x, x2: currGridWidth, y2: x, stroke: lineColor, strokeOpacity: .5, strokeWidth: strokeWidth })
                ];
            }),
            Array(rowMaxCount).fill(0).map((zero, index) => {
                const x = index * gridSize;
                const strokeWidth = .4 / scale;
                return [
                    React.createElement("line", { x1: x, y1: "0", x2: x, y2: currGridHeight, stroke: lineColor, strokeWidth: strokeWidth }),
                    React.createElement("line", { x1: "0", y1: x, x2: currGridWidth, y2: x, stroke: lineColor, strokeWidth: strokeWidth })
                ];
            })));
    }
}
exports.Grid = Grid;
exports.default = Grid;
