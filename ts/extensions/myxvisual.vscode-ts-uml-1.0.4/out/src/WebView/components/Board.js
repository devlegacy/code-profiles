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
const Content_1 = require("./Content");
const getTransform_1 = require("../utils/getTransform");
const layout_1 = require("../utils/layout");
const config_1 = require("../../config");
const Theme_1 = require("react-uwp/Theme");
const Button_1 = require("react-uwp/Button");
const CheckBox_1 = require("react-uwp/CheckBox");
const gridConfig = {
    gridWidth: window.innerWidth,
    gridHeight: window.innerHeight,
    lineColor: "#000",
    gridSize: 100,
    griItemCount: 10,
    scale: 1
};
class Board extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            config: config_1.config,
            fileDocEntries: []
        };
        this.mouseStatPosition = {};
        this.originTransform = {
            x: 0,
            y: 0,
            scale: 1
        };
        this.getChildContext = () => {
            return {
                config: this.state.config
            };
        };
        this.handleMessage = (event) => {
            const message = event.data;
            if (message.docEntries) {
                this.setState({ fileDocEntries: message.docEntries });
            }
        };
        this.handleWheel = (e) => {
            if (!this.content)
                return;
            const el = this.content.rootEl;
            if (e.ctrlKey) {
                this.originTransform.scale = Number((this.originTransform.scale + e.deltaY * .001).toFixed(2));
                if (this.originTransform.scale < .01) {
                    this.originTransform.scale = .01;
                }
                el.setAttributeNS(null, "transform", `translate(${this.originTransform.x}, ${this.originTransform.y}), scale(${this.originTransform.scale})`);
                this.showScaleEl.innerText = `${Math.ceil(this.originTransform.scale * 100)}%`;
                layout_1.setContentLayout({ x: this.originTransform.x, y: this.originTransform.y }, this.originTransform.scale);
            }
            else {
                this.setOriginTransform();
                const x = this.originTransform.x - e.deltaX;
                const y = this.originTransform.y - e.deltaY;
                el.setAttributeNS(null, "transform", `translate(${x}, ${y}), scale(${this.originTransform.scale})`);
                layout_1.setContentLayout({ x, y }, this.originTransform.scale);
            }
        };
        this.updateScale = (offsetScale) => {
            if (!this.content)
                return;
            const el = this.content.rootEl;
            this.originTransform.scale = Number((this.originTransform.scale + offsetScale).toFixed(2));
            if (this.originTransform.scale < .01) {
                this.originTransform.scale = .01;
            }
            el.setAttributeNS(null, "transform", `translate(${this.originTransform.x}, ${this.originTransform.y}), scale(${this.originTransform.scale})`);
            this.showScaleEl.innerText = `${Math.ceil(this.originTransform.scale * 100)}%`;
            layout_1.setContentLayout({ x: this.originTransform.x, y: this.originTransform.y }, this.originTransform.scale);
        };
        this.resize = (e) => {
            const { innerHeight, innerWidth } = window;
            this.rootEl.style.height = `${innerHeight}px`;
            this.rootEl.style.width = `${innerWidth}px`;
            if (this.grid) {
                this.grid.setState({
                    currGridWidth: innerWidth,
                    currGridHeight: innerHeight
                });
            }
        };
        this.setOriginTransform = () => {
            if (!this.content)
                return;
            const el = this.content.rootEl;
            this.screenMatrix = el.getScreenCTM();
            const transform = el.getAttributeNS(null, "transform");
            const translate = getTransform_1.getTranslate(transform);
            const scale = getTransform_1.getScale(transform);
            if (translate) {
                Object.assign(this.originTransform, translate);
            }
            if (scale !== null) {
                this.originTransform.scale = scale;
            }
        };
        this.handleMouseDown = (e) => {
            this.setOriginTransform();
            this.mouseStatPosition.x = e.clientX / this.screenMatrix.a;
            this.mouseStatPosition.y = e.clientY / this.screenMatrix.d;
            document.documentElement.addEventListener("mousemove", this.handleMouseMove);
            document.documentElement.addEventListener("mouseup", this.handleMouseUp);
        };
        this.handleMouseMove = (e) => {
            if (!this.content)
                return;
            const el = this.content.rootEl;
            const offsetX = e.clientX / this.screenMatrix.a - this.mouseStatPosition.x;
            const offsetY = e.clientY / this.screenMatrix.d - this.mouseStatPosition.y;
            if (this.originTransform) {
                const x = this.originTransform.x + offsetX;
                const y = this.originTransform.y + offsetY;
                el.setAttributeNS(null, "transform", `translate(${x}, ${y}), scale(${this.originTransform.scale})`);
                layout_1.setContentLayout({ x, y }, this.originTransform.scale);
            }
        };
        this.handleMouseUp = (e) => {
            document.documentElement.removeEventListener("mousemove", this.handleMouseMove);
            document.documentElement.removeEventListener("mouseup", this.handleMouseUp);
        };
    }
    componentWillMount() {
        window.vscode.postMessage({ boardWillMount: true });
        window.addEventListener("message", this.handleMessage);
        const parentEl = document.querySelector("body");
        parentEl.style.overflow = "hidden";
        parentEl.style.margin = "0";
    }
    componentDidMount() {
        window.addEventListener("resize", this.resize);
        this.rootEl.addEventListener("wheel", this.handleWheel);
        document.body.querySelectorAll("div").forEach(divEl => {
            if (divEl.className.includes("fluent-background")) {
                divEl.style.background = "none";
            }
        });
    }
    componentWillUnmount() {
        window.removeEventListener("message", this.handleMessage);
        window.removeEventListener("resize", this.resize);
        this.rootEl.removeEventListener("wheel", this.handleWheel);
    }
    render() {
        const _a = this.props, { staticContext } = _a, attributes = __rest(_a, ["staticContext"]);
        const { connectPathStyle, contentStyle, theme, showType } = this.getChildContext().config;
        const { arrowSize, color } = connectPathStyle;
        const { fileDocEntries } = this.state;
        return (React.createElement("div", null,
            React.createElement("svg", Object.assign({}, attributes, { ref: rootEl => this.rootEl = rootEl, onMouseDown: this.handleMouseDown, onMouseUp: this.handleMouseUp, fill: contentStyle.background }),
                React.createElement("defs", null,
                    React.createElement("marker", { id: "arrowStart", orient: "auto", markerHeight: arrowSize * 2, markerWidth: arrowSize, refY: arrowSize, refX: "0" },
                        React.createElement("path", { d: `M0,0 V${arrowSize * 2} L${arrowSize},${arrowSize} Z`, fill: color }))),
                fileDocEntries && fileDocEntries.length > 0 && React.createElement(Content_1.default, { key: showType, ref: content => this.content = content, fileDocEntries: fileDocEntries })),
            React.createElement("div", { style: { position: "fixed", right: 20, top: 20 } },
                React.createElement(Theme_1.Theme, { theme: Theme_1.getTheme({
                        themeName: "dark",
                        accent: theme.accent,
                        useFluentDesign: false
                    }), style: {
                        background: "#111",
                        border: `1px solid ${theme.accent}`,
                        padding: "16px 8px",
                    } },
                    React.createElement("div", null,
                        React.createElement(CheckBox_1.default, { onCheck: checked => {
                                this.setState((prevState) => {
                                    prevState.config.showType = config_1.config.showType === "member" ? "export" : "member";
                                    this.showScaleEl.innerText = "100%";
                                    return prevState;
                                });
                            }, style: { marginBottom: 16 }, key: config_1.config.showType, defaultChecked: config_1.config.showType === "export", label: "Only Export" })),
                    React.createElement("div", null,
                        React.createElement(Button_1.default, { style: { background: theme.accent }, onClick: () => this.updateScale(.1) }, "+"),
                        React.createElement("span", { ref: showScaleEl => this.showScaleEl = showScaleEl, style: {
                                margin: "0 8px",
                                display: "inline-block",
                                width: 60,
                                textAlign: "center"
                            } },
                            Math.ceil(this.originTransform.scale * 100),
                            "%"),
                        React.createElement(Button_1.default, { style: { background: theme.accent }, onClick: () => this.updateScale(-.1) }, "-"))))));
    }
}
Board.childContextTypes = {
    config: PropTypes.object
};
Board.defaultProps = {
    style: {
        width: window.innerWidth,
        height: window.innerHeight
    }
};
exports.Board = Board;
exports.default = Board;
