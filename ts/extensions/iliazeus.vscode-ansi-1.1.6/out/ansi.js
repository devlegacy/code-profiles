"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = exports.DefaultStyle = exports.AttributeFlags = exports.NamedColor = exports.ColorFlags = void 0;
var ColorFlags;
(function (ColorFlags) {
    ColorFlags[ColorFlags["Named"] = 16777216] = "Named";
    ColorFlags[ColorFlags["Bright"] = 33554432] = "Bright";
})(ColorFlags = exports.ColorFlags || (exports.ColorFlags = {}));
var NamedColor;
(function (NamedColor) {
    NamedColor[NamedColor["DefaultBackground"] = 16777456] = "DefaultBackground";
    NamedColor[NamedColor["DefaultForeground"] = 16777457] = "DefaultForeground";
    NamedColor[NamedColor["Black"] = 16777216] = "Black";
    NamedColor[NamedColor["Red"] = 16777217] = "Red";
    NamedColor[NamedColor["Green"] = 16777218] = "Green";
    NamedColor[NamedColor["Yellow"] = 16777219] = "Yellow";
    NamedColor[NamedColor["Blue"] = 16777220] = "Blue";
    NamedColor[NamedColor["Magenta"] = 16777221] = "Magenta";
    NamedColor[NamedColor["Cyan"] = 16777222] = "Cyan";
    NamedColor[NamedColor["White"] = 16777223] = "White";
    NamedColor[NamedColor["BrightBlack"] = 50331648] = "BrightBlack";
    NamedColor[NamedColor["BrightRed"] = 50331649] = "BrightRed";
    NamedColor[NamedColor["BrightGreen"] = 50331650] = "BrightGreen";
    NamedColor[NamedColor["BrightYellow"] = 50331651] = "BrightYellow";
    NamedColor[NamedColor["BrightBlue"] = 50331652] = "BrightBlue";
    NamedColor[NamedColor["BrightMagenta"] = 50331653] = "BrightMagenta";
    NamedColor[NamedColor["BrightCyan"] = 50331654] = "BrightCyan";
    NamedColor[NamedColor["BrightWhite"] = 50331655] = "BrightWhite";
})(NamedColor = exports.NamedColor || (exports.NamedColor = {}));
var AttributeFlags;
(function (AttributeFlags) {
    AttributeFlags[AttributeFlags["None"] = 0] = "None";
    AttributeFlags[AttributeFlags["Bold"] = 1] = "Bold";
    AttributeFlags[AttributeFlags["Faint"] = 2] = "Faint";
    AttributeFlags[AttributeFlags["Italic"] = 4] = "Italic";
    AttributeFlags[AttributeFlags["Underline"] = 8] = "Underline";
    AttributeFlags[AttributeFlags["SlowBlink"] = 16] = "SlowBlink";
    AttributeFlags[AttributeFlags["RapidBlink"] = 32] = "RapidBlink";
    AttributeFlags[AttributeFlags["Inverse"] = 64] = "Inverse";
    AttributeFlags[AttributeFlags["Conceal"] = 128] = "Conceal";
    AttributeFlags[AttributeFlags["CrossedOut"] = 256] = "CrossedOut";
    AttributeFlags[AttributeFlags["Fraktur"] = 512] = "Fraktur";
    AttributeFlags[AttributeFlags["DoubleUnderline"] = 1024] = "DoubleUnderline";
    AttributeFlags[AttributeFlags["Proportional"] = 2048] = "Proportional";
    AttributeFlags[AttributeFlags["Framed"] = 4096] = "Framed";
    AttributeFlags[AttributeFlags["Encircled"] = 8192] = "Encircled";
    AttributeFlags[AttributeFlags["Overlined"] = 16384] = "Overlined";
    AttributeFlags[AttributeFlags["Superscript"] = 32768] = "Superscript";
    AttributeFlags[AttributeFlags["Subscript"] = 65536] = "Subscript";
    AttributeFlags[AttributeFlags["EscapeSequence"] = -2147483648] = "EscapeSequence";
})(AttributeFlags = exports.AttributeFlags || (exports.AttributeFlags = {}));
exports.DefaultStyle = {
    backgroundColor: NamedColor.DefaultBackground,
    foregroundColor: NamedColor.DefaultForeground,
    attributeFlags: 0,
    fontIndex: 0,
};
class Parser {
    constructor(options = { doubleUnderline: false }) {
        this.options = options;
        this._finalStyle = Object.assign({}, exports.DefaultStyle);
    }
    clear() {
        this._finalStyle = Object.assign({}, exports.DefaultStyle);
    }
    appendLine(text) {
        return this._parseLine(text, this._finalStyle);
    }
    _parseLine(text, style) {
        const spans = [];
        let textOffset = 0;
        let index = 0;
        while (index < text.length) {
            if (text.codePointAt(index) !== 0x1b) {
                let escOffset = text.indexOf("\x1b", index);
                if (escOffset === -1)
                    escOffset = text.length;
                spans.push(Object.assign(Object.assign({}, style), { offset: textOffset, length: escOffset - textOffset }));
                textOffset = escOffset;
                index = escOffset;
                continue;
            }
            if (index === text.length - 1) {
                break;
            }
            if (text[index + 1] !== "[") {
                index += 1;
                continue;
            }
            const match = text.slice(index + 2).match(/^([0-9;]*)([a-zA-Z])/);
            if (!match) {
                index += 1;
                continue;
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const argString = match[1], commandLetter = match[2];
            spans.push(Object.assign(Object.assign({}, style), { offset: index, length: 2 + argString.length + 1, attributeFlags: style.attributeFlags | AttributeFlags.EscapeSequence }));
            if (commandLetter === "m") {
                const args = argString
                    .split(";")
                    .filter((arg) => arg !== "")
                    .map((arg) => parseInt(arg, 10));
                if (args.length === 0)
                    args.push(0);
                this._applyCodes(args, style);
            }
            textOffset = index + 2 + argString.length + 1;
            index = textOffset;
        }
        spans.push(Object.assign(Object.assign({}, style), { offset: textOffset, length: index - textOffset }));
        return spans;
    }
    _applyCodes(args, style) {
        for (let argIndex = 0; argIndex < args.length; argIndex += 1) {
            const code = args[argIndex];
            switch (code) {
                case 0:
                    Object.assign(style, exports.DefaultStyle);
                    break;
                case 1:
                    style.attributeFlags |= AttributeFlags.Bold;
                    style.attributeFlags &= ~AttributeFlags.Faint;
                    break;
                case 2:
                    style.attributeFlags |= AttributeFlags.Faint;
                    style.attributeFlags &= ~AttributeFlags.Bold;
                    break;
                case 3:
                    style.attributeFlags |= AttributeFlags.Italic;
                    style.attributeFlags &= ~AttributeFlags.Fraktur;
                    break;
                case 4:
                    style.attributeFlags |= AttributeFlags.Underline;
                    style.attributeFlags &= ~AttributeFlags.DoubleUnderline;
                    break;
                case 5:
                    style.attributeFlags |= AttributeFlags.SlowBlink;
                    style.attributeFlags &= ~AttributeFlags.RapidBlink;
                    break;
                case 6:
                    style.attributeFlags |= AttributeFlags.RapidBlink;
                    style.attributeFlags &= ~AttributeFlags.SlowBlink;
                    break;
                case 7:
                    style.attributeFlags |= AttributeFlags.Inverse;
                    break;
                case 8:
                    style.attributeFlags |= AttributeFlags.Conceal;
                    break;
                case 9:
                    style.attributeFlags |= AttributeFlags.CrossedOut;
                    break;
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                    style.fontIndex = code - 10;
                    break;
                case 20:
                    style.attributeFlags |= AttributeFlags.Fraktur;
                    style.attributeFlags &= ~AttributeFlags.Italic;
                    break;
                case 21:
                    if (this.options.doubleUnderline) {
                        style.attributeFlags |= AttributeFlags.DoubleUnderline;
                        style.attributeFlags &= ~AttributeFlags.Underline;
                        break;
                    }
                    style.attributeFlags &= ~AttributeFlags.Bold;
                    break;
                case 22:
                    style.attributeFlags &= ~AttributeFlags.Bold;
                    style.attributeFlags &= ~AttributeFlags.Faint;
                    break;
                case 23:
                    style.attributeFlags &= ~AttributeFlags.Italic;
                    style.attributeFlags &= ~AttributeFlags.Fraktur;
                    break;
                case 24:
                    style.attributeFlags &= ~AttributeFlags.Underline;
                    style.attributeFlags &= ~AttributeFlags.DoubleUnderline;
                    break;
                case 25:
                    style.attributeFlags &= ~AttributeFlags.SlowBlink;
                    style.attributeFlags &= ~AttributeFlags.RapidBlink;
                    break;
                case 26:
                    style.attributeFlags |= AttributeFlags.Proportional;
                    break;
                case 27:
                    style.attributeFlags &= ~AttributeFlags.Inverse;
                    break;
                case 28:
                    style.attributeFlags &= ~AttributeFlags.Conceal;
                    break;
                case 29:
                    style.attributeFlags &= ~AttributeFlags.CrossedOut;
                    break;
                case 30:
                case 31:
                case 32:
                case 33:
                case 34:
                case 35:
                case 36:
                case 37:
                    style.foregroundColor = ColorFlags.Named | (code - 30);
                    break;
                case 38: {
                    const colorType = args[argIndex + 1];
                    if (colorType === 5) {
                        const color = args[argIndex + 2];
                        argIndex += 2;
                        if (0 <= color && color <= 255) {
                            style.foregroundColor = this._convert8BitColor(color);
                        }
                    }
                    if (colorType === 2) {
                        const r = args[argIndex + 2];
                        const g = args[argIndex + 3];
                        const b = args[argIndex + 4];
                        argIndex += 4;
                        if (0 <= r && r <= 255 && 0 <= g && g <= 255 && 0 <= b && b <= 255) {
                            style.foregroundColor = (r << 16) | (g << 8) | b;
                        }
                    }
                    break;
                }
                case 39:
                    style.foregroundColor = exports.DefaultStyle.foregroundColor;
                    break;
                case 40:
                case 41:
                case 42:
                case 43:
                case 44:
                case 45:
                case 46:
                case 47:
                    style.backgroundColor = ColorFlags.Named | (code - 40);
                    break;
                case 48: {
                    const colorType = args[argIndex + 1];
                    if (colorType === 5) {
                        const color = args[argIndex + 2];
                        argIndex += 2;
                        if (0 <= color && color <= 255) {
                            style.backgroundColor = this._convert8BitColor(color);
                        }
                    }
                    if (colorType === 2) {
                        const r = args[argIndex + 2];
                        const g = args[argIndex + 3];
                        const b = args[argIndex + 4];
                        argIndex += 4;
                        if (0 <= r && r <= 255 && 0 <= g && g <= 255 && 0 <= b && b <= 255) {
                            style.backgroundColor = (r << 16) | (g << 8) | b;
                        }
                    }
                    break;
                }
                case 49:
                    style.backgroundColor = exports.DefaultStyle.backgroundColor;
                    break;
                case 50:
                    style.attributeFlags &= ~AttributeFlags.Proportional;
                    break;
                case 51:
                    style.attributeFlags |= AttributeFlags.Framed;
                    style.attributeFlags &= ~AttributeFlags.Encircled;
                    break;
                case 52:
                    style.attributeFlags |= AttributeFlags.Encircled;
                    style.attributeFlags &= ~AttributeFlags.Framed;
                    break;
                case 53:
                    style.attributeFlags |= AttributeFlags.Overlined;
                    break;
                case 54:
                    style.attributeFlags &= ~AttributeFlags.Framed;
                    style.attributeFlags &= ~AttributeFlags.Encircled;
                    break;
                case 55:
                    style.attributeFlags &= ~AttributeFlags.Overlined;
                    break;
                case 58:
                    // TODO: underline colors
                    break;
                case 59:
                    // TODO: underline colors
                    break;
                case 73:
                    style.attributeFlags |= AttributeFlags.Superscript;
                    style.attributeFlags &= ~AttributeFlags.Subscript;
                    break;
                case 74:
                    style.attributeFlags |= AttributeFlags.Subscript;
                    style.attributeFlags &= ~AttributeFlags.Superscript;
                    break;
                case 90:
                case 91:
                case 92:
                case 93:
                case 94:
                case 95:
                case 96:
                case 97:
                    style.foregroundColor = ColorFlags.Named | ColorFlags.Bright | (code - 90);
                    break;
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                    style.backgroundColor = ColorFlags.Named | ColorFlags.Bright | (code - 100);
                    break;
            }
        }
    }
    _convert8BitColor(color) {
        if (0 <= color && color <= 7) {
            return ColorFlags.Named | color;
        }
        if (8 <= color && color <= 15) {
            return ColorFlags.Named | ColorFlags.Bright | (color - 8);
        }
        if (232 <= color && color <= 255) {
            const intensity = ((255 * (color - 232)) / 23) | 0;
            return (intensity << 16) | (intensity << 8) | intensity;
        }
        let color6 = color - 16;
        const b6 = color6 % 6;
        color6 = (color6 / 6) | 0;
        const g6 = color6 % 6;
        color6 = (color6 / 6) | 0;
        const r6 = color6;
        const r = ((255 * r6) / 5) | 0;
        const g = ((255 * g6) / 5) | 0;
        const b = ((255 * b6) / 5) | 0;
        return (r << 16) | (g << 8) | b;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=ansi.js.map