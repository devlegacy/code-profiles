import vscode from "vscode";
type ServerStatus = "unloaded" | "loading" | "active" | "failed" | "dead";
export type State = {
    serverStatus: ServerStatus;
    port: number;
};
export declare const activate: (context: vscode.ExtensionContext) => Promise<void>, deactivate: () => void;
export {};
//# sourceMappingURL=extension.d.ts.map