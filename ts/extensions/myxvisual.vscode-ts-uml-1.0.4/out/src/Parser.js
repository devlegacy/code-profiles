"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const customType = {
    "8388608": "React",
    "16777220": "prototype"
};
class Parser {
    constructor(options, host) {
        this.getAllLocalMembers = false;
        this.output = {};
        this.parse = (fileName, callback = (result) => { }) => {
            const rootNames = Array.isArray(fileName) ? fileName : [fileName];
            this.rootNames = rootNames;
            this.program = ts.createProgram(rootNames, this.options, this.host);
            this.checker = this.program.getTypeChecker();
            this.sourceFiles = this.program.getSourceFiles();
            for (const fileName of this.rootNames) {
                this.currSourceFile = this.program.getSourceFile(fileName);
                this.visit(this.currSourceFile);
            }
            if (this.output.members) {
                this.output.members = this.output.members.filter(member => member);
            }
            callback(this.output);
            return this.output;
        };
        this.visit = (node) => {
            if (!node)
                return;
            let symbol = null;
            switch (node.kind) {
                case ts.SyntaxKind.SourceFile: {
                    symbol = this.getSymbolByType(node);
                    if (!symbol) {
                        symbol = this.currSourceFile;
                    }
                    this.output.filename = node.fileName;
                    break;
                }
                case ts.SyntaxKind.ClassDeclaration: {
                    symbol = this.getSymbolByType(node);
                    break;
                }
                case ts.SyntaxKind.InterfaceDeclaration: {
                    symbol = this.getSymbolByType(node);
                    break;
                }
                case ts.SyntaxKind.FunctionDeclaration: {
                    symbol = this.getSymbolByType(node);
                    break;
                }
                case ts.SyntaxKind.MethodDeclaration: {
                    symbol = this.getSymbolByType(node);
                    break;
                }
                case ts.SyntaxKind.PropertyDeclaration: {
                    symbol = this.getSymbolByType(node);
                    break;
                }
                case ts.SyntaxKind.EnumDeclaration: {
                    symbol = this.getSymbolByType(node);
                    break;
                }
                case ts.SyntaxKind.ImportDeclaration: {
                    symbol = this.getSymbolByType(node);
                    break;
                }
                case ts.SyntaxKind.VariableDeclaration: {
                    symbol = this.getSymbolByType(node);
                    break;
                }
                case ts.SyntaxKind.VariableStatement: {
                    symbol = this.getSymbolByType(node);
                    break;
                }
                case ts.SyntaxKind.ExportAssignment: {
                    symbol = this.getSymbolByType(node);
                    break;
                }
                case ts.SyntaxKind.EndOfFileToken: {
                    symbol = this.getSymbolByType(node);
                    break;
                }
                default: {
                    break;
                }
            }
            if (node.kind === ts.SyntaxKind.SourceFile) {
                const result = this.serializeSymbol(symbol);
                Object.assign(this.output, result);
            }
            else {
                const result = this.serializeSymbol(symbol);
                if (this.getResultCallback) {
                    this.getResultCallback(result);
                    this.getResultCallback = void 0;
                }
                if (result && !this.getAllLocalMembers) {
                    this.output.members = [...(this.output.members || []), result];
                }
            }
        };
        this.getSymbolByType = (declaration) => {
            return this.checker.getSymbolAtLocation(declaration["name"]) || this.checker.getSymbolAtLocation(declaration);
        };
        this.serializeSymbol = (symbol, getAllAst = true) => {
            if (!symbol || typeof symbol !== "object") {
                return;
            }
            let name = symbol.getName ? symbol.getName() : symbol.name;
            let docEntryFilename;
            let escapedName;
            let initializerText;
            if (symbol.valueDeclaration) {
                const initializer = symbol.valueDeclaration["initializer"];
                if (initializer) {
                    initializerText = initializer.getFullText();
                }
            }
            let valueDeclarationText;
            if (symbol.valueDeclaration && symbol.valueDeclaration.getFullText) {
                valueDeclarationText = symbol.valueDeclaration.getFullText();
            }
            let type;
            try {
                type = this.checker.typeToString(this.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration));
            }
            catch (e) {
                type = "unknown";
            }
            if (!type || type === "any") {
                type = ts.SymbolFlags[symbol.flags] || "any";
            }
            const isSourceFile = Boolean(symbol.flags === ts.SymbolFlags.ValueModule || (symbol["kind"] && symbol["kind"] === ts.SyntaxKind.SourceFile));
            const isNamseSpace = symbol.flags === ts.SymbolFlags.NamespaceModule;
            let documentation;
            try {
                documentation = ts.displayPartsToString(symbol.getDocumentationComment(void 0));
            }
            catch (e) {
            }
            let isRequired;
            const parentSymbol = symbol.parent;
            if (parentSymbol && parentSymbol.flags === ts.SymbolFlags.Interface) {
                const valueDeclaration = symbol.valueDeclaration;
                isRequired = valueDeclaration ? !valueDeclaration.questionToken : false;
            }
            if (symbol.flags === ts.SymbolFlags.AliasExcludes ||
                symbol.flags === 2097152) {
                const aliasSymbol = this.checker.getAliasedSymbol(symbol);
                escapedName = aliasSymbol.escapedName.toString();
                if (aliasSymbol["parent"]) {
                    docEntryFilename = aliasSymbol["parent"].valueDeclaration.fileName;
                }
            }
            if (symbol.flags === ts.SymbolFlags.Property) {
                const docEntry = {
                    name,
                    isRequired
                };
                docEntry.type = this.checker.typeToString(this.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration));
                docEntry.documentation = ts.displayPartsToString(symbol.getDocumentationComment(void 0));
                docEntry.initializerText = initializerText;
                docEntry.valueDeclarationText = valueDeclarationText;
                docEntry.documentation = docEntry.documentation ? docEntry.documentation : void 0;
                return docEntry;
            }
            let extendsDocEntry = [];
            let exportsDocEntry;
            let membersDocEntry;
            if (symbol.flags === ts.SymbolFlags.Class || symbol.flags === ts.SymbolFlags.Interface) {
                symbol.declarations.forEach((declaration, index) => {
                    if (declaration["heritageClauses"]) {
                        const firstHeritageClause = declaration["heritageClauses"][0];
                        firstHeritageClause.types.forEach((type, index) => {
                            const firstHeritageClauseType = firstHeritageClause.types[index];
                            const extendsSymbol = this.checker.getSymbolAtLocation(firstHeritageClauseType.expression);
                            extendsDocEntry.push(this.serializeSymbol(extendsSymbol, false));
                        });
                    }
                });
            }
            if ("exports" in symbol && symbol.exports.size) {
                exportsDocEntry = [];
                const values = symbol.exports.values();
                for (let i = 0; i < symbol.exports.size; i++) {
                    const result = values.next();
                    exportsDocEntry.push(this.serializeSymbol(result.value, isNamseSpace));
                }
            }
            if (isSourceFile || (getAllAst && (symbol.flags === ts.SymbolFlags.Class || symbol.flags === ts.SymbolFlags.Interface))) {
                if (isSourceFile && this.getAllLocalMembers) {
                    membersDocEntry = [];
                }
                else if ("members" in symbol && symbol.members.size) {
                    membersDocEntry = [];
                    const values = symbol.members.values();
                    for (let i = 0; i < symbol.members.size; i++) {
                        const result = values.next();
                        const docEntry = this.serializeSymbol(result.value, isSourceFile ? false : (isNamseSpace ? false : true));
                        membersDocEntry.push(docEntry);
                    }
                }
            }
            const docEntry = {
                name,
                escapedName,
                exports: isNamseSpace ? membersDocEntry : exportsDocEntry,
                members: isNamseSpace ? exportsDocEntry : membersDocEntry,
                type,
                isRequired,
                documentation: documentation ? documentation : void 0,
                extends: extendsDocEntry.length > 0 ? extendsDocEntry : void 0,
                filename: isSourceFile ? (symbol["fileName"] || symbol.valueDeclaration["resolvedPath"]) : docEntryFilename,
                initializerText,
                valueDeclarationText
            };
            if (isSourceFile) {
                if (symbol.valueDeclaration) {
                    const resolvedModules = symbol.valueDeclaration["resolvedModules"];
                    if (resolvedModules) {
                        docEntry.resolvedModules = [];
                        for (const moduleNode of resolvedModules) {
                            const data = moduleNode[1];
                            docEntry.resolvedModules.push({
                                name: moduleNode[0],
                                resolvedFileName: data ? data.resolvedFileName : void 0,
                                isExternalLibraryImport: data ? data.isExternalLibraryImport : void 0
                            });
                        }
                    }
                }
                docEntry.locals = [];
                if (this.getAllLocalMembers) {
                    docEntry.members = [];
                }
                docEntry.exportMembers = [];
                let locals = symbol["locals"];
                if (!locals && symbol.valueDeclaration) {
                    locals = symbol.valueDeclaration["locals"];
                }
                for (const local of locals) {
                    const isExportMember = Boolean(local[1]["exportSymbol"]);
                    const symbol = isExportMember ? local[1]["exportSymbol"] : local[1];
                    if (isExportMember) {
                        let name = symbol.name;
                        if (!name && symbol.getName) {
                            name = symbol.getName();
                        }
                        if (name) {
                            docEntry.exportMembers.push(name);
                        }
                    }
                    docEntry.locals.push(this.serializeSymbol(symbol, false));
                    if (this.getAllLocalMembers) {
                        docEntry.members.push(this.serializeSymbol(symbol, this.getAllLocalMembers));
                    }
                }
            }
            return docEntry;
        };
        const defaultOptions = {
            target: ts.ScriptTarget.ES5,
            maxNodeModuleJsDepth: 1,
            module: ts.ModuleKind.CommonJS
        };
        this.options = options || defaultOptions;
        this.host = host;
    }
}
exports.Parser = Parser;
exports.default = Parser;
