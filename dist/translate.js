"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const fetch = require('node-fetch-polyfill');
const translate = async ({ query, source, target, format, apiUrl, apiKey }) => {
    if (!apiUrl && !apiKey)
        throw new TypeError("You need an API key to use the public LibreTranslate API!");
    if (!apiUrl)
        apiUrl = "https://libretranslate.com";
    if (!source)
        source = "auto";
    const res = await fetch(`${apiUrl}/translate`, {
        method: "POST",
        body: JSON.stringify({
            q: query,
            source: source,
            target: target,
            format: format || "text",
            apiKey: apiKey || "",
        }),
        headers: { "Content-Type": "application/json" }
    });
    try {
        let t = await res.json();
        return t.translatedText;
    }
    catch (err) {
        throw err;
    }
};
exports.translate = translate;
//# sourceMappingURL=translate.js.map