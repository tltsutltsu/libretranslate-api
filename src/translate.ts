interface TranslateOptions {
    query: string;
    source?: string;
    target: string;
    format?: string;
    apiUrl?: string
    apiKey?: string;
}

export const translate = async({ query, source, target, format, apiUrl, apiKey }: TranslateOptions) => {
    if (!apiUrl && !apiKey) throw new TypeError("You need an API key to use the public LibreTranslate API!");
    if (!apiUrl) apiUrl = "https://libretranslate.com";
    if (!source) source = "auto";

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
  } catch (err) {
	throw err;
  }
}
