import { ExtensionContext, WorkspaceFolder } from 'vscode';
import { KeyStyle, DirStructureAuto, SortCompare, TargetPickingStrategy } from '.';
import { CaseStyles } from '~/utils/changeCase';
import { ExtractionBabelOptions, ExtractionHTMLOptions } from '~/extraction/parsers/options';
export declare class Config {
    static readonly reloadConfigs: string[];
    static readonly refreshConfigs: string[];
    static readonly usageRefreshConfigs: string[];
    static ctx: ExtensionContext;
    static get root(): string;
    static get disabled(): boolean;
    static get autoDetection(): boolean;
    static get displayLanguage(): string;
    static set displayLanguage(value: string);
    static get sourceLanguage(): string;
    static set sourceLanguage(value: string);
    static get tagSystem(): import("../tagSystems/base").BaseTagSystem;
    static normalizeLocale(locale: string, fallback?: string, strict?: boolean): string;
    static getBCP47(locale: string): string | undefined;
    static get ignoredLocales(): string[];
    static set ignoredLocales(value: string[]);
    static get _keyStyle(): KeyStyle;
    static set _keyStyle(value: KeyStyle);
    static get annotations(): boolean;
    static set annotations(value: boolean);
    static get annotationMaxLength(): number;
    static set annotationMaxLength(value: number);
    static get annotationDelimiter(): string;
    static get annotationInPlace(): boolean;
    static get namespace(): boolean | undefined;
    static get defaultNamespace(): string | undefined;
    static get enabledFrameworks(): string[] | undefined;
    static get enabledParsers(): string[] | undefined;
    static get _dirStructure(): DirStructureAuto;
    static set _dirStructure(value: DirStructureAuto);
    static get sortKeys(): boolean;
    static get sortCompare(): SortCompare;
    static get sortLocale(): string | undefined;
    static get readonly(): boolean;
    static get includeSubfolders(): boolean;
    static get fullReloadOnChanged(): boolean;
    static get preferredDelimiter(): string;
    static get _pathMatcher(): string | undefined;
    static get regexKey(): string;
    static get _regexUsageMatch(): string[] | undefined;
    static get _regexUsageMatchAppend(): string[];
    static get keepFulfilled(): boolean;
    static get translateFallbackToKey(): boolean;
    static get translateSaveAsCandidates(): boolean;
    static get frameworksRubyRailsScopeRoot(): string;
    static get parsersTypescriptTsNodePath(): string;
    static get parsersTypescriptCompilerOption(): any;
    static get parsersExtendFileExtensions(): any;
    static toggleLocaleVisibility(locale: string, visible?: boolean): void;
    static get _localesPaths(): string[] | undefined;
    static set _localesPaths(paths: string[] | undefined);
    static getLocalesPathsInScope(scope: WorkspaceFolder): string[] | undefined;
    static updateLocalesPaths(paths: string[]): void;
    static get themeAnnotation(): string;
    static get themeAnnotationMissing(): string;
    static get themeAnnotationBorder(): string;
    static get themeAnnotationMissingBorder(): string;
    static get extension(): import("vscode").Extension<any> | undefined;
    static get extensionPath(): string;
    static get encoding(): string;
    static get indent(): number;
    static get tabStyle(): " " | "\t";
    static get translatePromptSource(): boolean;
    static get translateParallels(): number;
    static get translateEngines(): string[];
    static get refactorTemplates(): import("./types").CustomRefactorTemplate[];
    static get disablePathParsing(): boolean;
    static get ignoreFiles(): string[];
    static get keysInUse(): string[];
    static set keysInUse(value: string[]);
    static get usageDerivedKeyRules(): string[] | undefined;
    static get usageScanningIgnore(): string[];
    static get preferEditor(): boolean;
    static get reviewEnabled(): boolean;
    static get reviewGutters(): boolean;
    private static _reviewUserName;
    static get reviewUserName(): string;
    private static _reviewUserEmail;
    static get reviewUserEmail(): string;
    static get reviewUser(): {
        name: string;
        email: string;
    };
    static get reviewRemoveCommentOnResolved(): boolean;
    static get translateOverrideExisting(): boolean;
    static get keygenStrategy(): string;
    static get keygenStyle(): CaseStyles;
    static get keyPrefix(): string;
    static get extractKeyMaxLength(): number;
    static get extractAutoDetect(): boolean;
    static set extractAutoDetect(v: boolean);
    static get extractParserHTMLOptions(): ExtractionHTMLOptions;
    static get extractParserBabelOptions(): ExtractionBabelOptions;
    static get extractIgnored(): string[];
    static set extractIgnored(v: string[]);
    static get extractIgnoredByFiles(): Record<string, string[]>;
    static set extractIgnoredByFiles(v: Record<string, string[]>);
    static get showFlags(): boolean;
    static get parserOptions(): any;
    static get localeCountryMap(): {
        en: string;
        zh: string;
        de: string;
        fr: string;
        ja: string;
        es: string;
        vi: string;
        lb: string;
    } & Record<string, string>;
    static get targetPickingStrategy(): TargetPickingStrategy;
    private static getConfig;
    private static setConfig;
    static get baiduApiSecret(): string | null | undefined;
    static get baiduAppid(): string | null | undefined;
    static get googleApiKey(): string | null | undefined;
    static get deeplApiKey(): string | null | undefined;
    static get deeplUseFreeApiEntry(): boolean | undefined;
    static get deeplLog(): boolean;
    static get libreTranslateApiRoot(): string | null | undefined;
    static get openaiApiKey(): string | null | undefined;
    static get openaiApiRoot(): string | null | undefined;
    static get openaiApiModel(): string;
    static get telemetry(): boolean;
}