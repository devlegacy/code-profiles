declare const createClient: (port: number) => {
    isServerActivated: {
        query: (input?: void | undefined, opts?: import("@trpc/server").ProcedureOptions | undefined) => Promise<{
            success: boolean;
            data: {
                isActivated: boolean;
            };
        }>;
    };
    getTypeFromPos: {
        query: (input: {
            filePath: string;
            line: number;
            character: number;
        }, opts?: import("@trpc/server").ProcedureOptions | undefined) => Promise<{
            type: {
                kind: "SERIALIZED_TYPE_OBJECT";
                value: string;
            };
            declareName?: string | undefined;
        }>;
    };
    getObjectProps: {
        query: (input: {
            storeKey: string;
        }, opts?: import("@trpc/server").ProcedureOptions | undefined) => Promise<{
            type: {
                kind: "SERIALIZED_TYPE_OBJECT";
                value: string;
            };
            propName: string;
        }[]>;
    };
};
export type ApiClient = ReturnType<typeof createClient>;
export declare const updatePortNumber: (nextPort: number) => void, client: () => ApiClient;
export {};
//# sourceMappingURL=api-client.d.ts.map