"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
if (!window.vscode) {
    window.vscode = acquireVsCodeApi();
}
const Board_1 = require("./components/Board");
const { render } = ReactDOM;
const rootEl = document.getElementById("app");
const renderToDOM = (AppContainer, AppComponent = Board_1.default) => {
    if (AppContainer) {
        render(React.createElement("div", null,
            React.createElement(AppComponent, null)), rootEl);
    }
    else {
        render(React.createElement(Board_1.default, null), rootEl);
    }
};
renderToDOM();
