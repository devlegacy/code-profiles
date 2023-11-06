import vscode from "vscode";
import type { TypeObject } from "compiler-api-helper";
import type { ExtensionOption } from "../types/option";
export type TypeExpandProviderOptions = ExtensionOption;
export declare class TypeExpandProvider implements vscode.TreeDataProvider<ExpandableTypeItem> {
    private options;
    private selection?;
    private selectedType?;
    private activeFilePath;
    private isAlreadyShowTopElement;
    constructor(options: TypeExpandProviderOptions);
    updateOptions(options: TypeExpandProviderOptions): void;
    private isCurrentFileValidated;
    restart(): void;
    getTreeItem(element: ExpandableTypeItem): vscode.TreeItem;
    getChildren(element?: ExpandableTypeItem): Thenable<ExpandableTypeItem[]>;
    updateSelection(selection: vscode.Selection): Promise<void>;
    updateActiveFile(activeFilePath: string | undefined): void;
    private resetSelection;
    private _onDidChangeTreeData;
    readonly onDidChangeTreeData: vscode.Event<ExpandableTypeItem | undefined | null | void>;
    refresh(): void;
    close(): void;
}
export declare class ExpandableTypeItem extends vscode.TreeItem {
    private type;
    static options: TypeExpandProviderOptions;
    constructor(type: TypeObject, meta?: {
        parent?: TypeObject;
        aliasName?: string;
        desc?: string;
    });
    static updateOptions(options: TypeExpandProviderOptions): void;
    getChildrenItems(): Promise<ExpandableTypeItem[]>;
}
//# sourceMappingURL=type-expand-provider.d.ts.map