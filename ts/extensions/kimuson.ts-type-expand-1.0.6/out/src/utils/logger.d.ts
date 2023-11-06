type LogLevel = "info" | "warn" | "error";
type ILogger = {
    [K in LogLevel]: (kind: string, obj: Record<string, unknown>, message?: string) => void;
};
export declare const logger: ILogger;
export {};
//# sourceMappingURL=logger.d.ts.map