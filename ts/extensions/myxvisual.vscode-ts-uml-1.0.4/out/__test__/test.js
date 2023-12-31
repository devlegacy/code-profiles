"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const getFileDocEntries_1 = require("../src/getFileDocEntries");
exports.testConfig = {
    getAllLocalMembers: true,
    showType: "member",
    fileMaxDepth: 0,
    tableStyle: {
        itemPadding: 12,
        textPadding: 20,
        headerHeight: 36,
        itemHeight: 28,
        headerFontSize: 14,
        itemFontSize: 12
    },
    fileStyle: {
        widthPadding: 8,
        heightPadding: 16,
        headerHeight: 24,
        headerFontSize: 12,
        tableOffset: 48,
        fileOffset: 40
    },
    connectPathStyle: {
        color: "#333",
        strokeDasharray: "4 2",
        arrowSize: 6
    },
    contentStyle: {
        background: "#e5e5e5",
        padding: 24
    },
    theme: {
        accent: 0 ? "red" : "#005aa0"
    },
    maxShowTypeLength: 20
};
const testFile = path.join(__dirname, "../src/WebView/components/Board.tsx");
const result = getFileDocEntries_1.getFileDocEntries(testFile, 0, exports.testConfig);
console.log(result);
