"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeRegisteredTextEditorDecorationProviders = exports.registerTextEditorDecorationProvider = void 0;
const registeredProviders = new Set();
function registerTextEditorDecorationProvider(provider) {
    registeredProviders.add(provider);
    return { dispose: () => registeredProviders.delete(provider) };
}
exports.registerTextEditorDecorationProvider = registerTextEditorDecorationProvider;
function executeRegisteredTextEditorDecorationProviders(editor, token) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const provider of registeredProviders) {
            let decorations;
            try {
                decorations = yield provider.provideDecorationRanges(editor.document, token);
            }
            catch (error) {
                console.error(`error providing decorations`, error);
                return;
            }
            if (token.isCancellationRequested) {
                return;
            }
            if (!decorations) {
                return;
            }
            const decorationTypes = new Map();
            for (const [key, ranges] of decorations) {
                let decorationType = decorationTypes.get(key);
                if (!decorationType) {
                    try {
                        decorationType = yield provider.resolveDecoration(key, token);
                    }
                    catch (error) {
                        console.error(`error providing decorations for key ${key}`, error);
                        continue;
                    }
                    if (token.isCancellationRequested) {
                        return;
                    }
                    if (!decorationType) {
                        console.error(`no decoration resolved for key ${key}`);
                        continue;
                    }
                    decorationTypes.set(key, decorationType);
                }
                editor.setDecorations(decorationType, ranges);
            }
        }
    });
}
exports.executeRegisteredTextEditorDecorationProviders = executeRegisteredTextEditorDecorationProviders;
//# sourceMappingURL=TextEditorDecorationProvider.js.map