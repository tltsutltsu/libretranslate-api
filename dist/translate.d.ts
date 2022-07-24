interface TranslateOptions {
    query: string;
    source?: string;
    target: string;
    format?: string;
    apiUrl?: string;
    apiKey?: string;
}
export declare const translate: ({ query, source, target, format, apiUrl, apiKey }: TranslateOptions) => Promise<any>;
export {};
//# sourceMappingURL=translate.d.ts.map