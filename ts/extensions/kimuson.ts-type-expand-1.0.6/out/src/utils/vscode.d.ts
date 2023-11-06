import vscode from "vscode";
import type { ExtensionOption } from "../types/option";
export declare function getCurrentFilePath(): string | undefined;
export declare function getCurrentFileLanguageId(): string | undefined;
export declare function getActiveWorkspace(): vscode.WorkspaceFolder | undefined;
/**
 * @name getExtensionConfig
 * package.json で default 値が設定されている前提
 */
export declare function getExtensionConfig<Key extends keyof ExtensionOption, RetType = ExtensionOption[Key]>(key: Key): RetType;
//# sourceMappingURL=vscode.d.ts.map