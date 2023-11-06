"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTransform_1 = require("./getTransform");
function addDragToSVGElement(targetEl, transformEl, onChangeView) {
    if (!targetEl)
        return;
    if (!transformEl) {
        transformEl = targetEl;
    }
    const mouseStatPosition = { x: 0, y: 0 };
    const originTransform = { x: 0, y: 0 };
    const currTransform = { x: 0, y: 0 };
    let screenMatrix;
    targetEl.addEventListener("mousedown", handleMouseDown);
    targetEl.addEventListener("mouseup", handleMouseUp);
    function handleMouseDown(e) {
        e.stopPropagation();
        screenMatrix = transformEl.getScreenCTM();
        mouseStatPosition.x = e.clientX / screenMatrix.a;
        mouseStatPosition.y = e.clientY / screenMatrix.d;
        const transform = transformEl.getAttributeNS(null, "transform");
        const translate = getTransform_1.getTranslate(transform);
        if (translate) {
            Object.assign(originTransform, translate);
        }
        document.documentElement.addEventListener("mousemove", handleMouseMove);
        document.documentElement.addEventListener("mouseup", handleMouseUp);
    }
    function handleMouseMove(e) {
        const offsetX = e.clientX / screenMatrix.a - mouseStatPosition.x;
        const offsetY = e.clientY / screenMatrix.d - mouseStatPosition.y;
        const x = originTransform.x + offsetX;
        const y = originTransform.y + offsetY;
        currTransform.x = x;
        currTransform.y = y;
        transformEl.setAttributeNS(null, "transform", `translate(${x}, ${y})`);
        if (onChangeView)
            onChangeView({ x, y });
    }
    function handleMouseUp(e) {
        if (onChangeView)
            onChangeView(currTransform);
        document.documentElement.removeEventListener("mousemove", handleMouseMove);
        document.documentElement.removeEventListener("mouseup", handleMouseUp);
    }
}
exports.addDragToSVGElement = addDragToSVGElement;
exports.default = addDragToSVGElement;
