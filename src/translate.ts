interface TranslateOptions {
    query: string;
    source?: string;
    target: string;
    format?: string;
	apiurl?: string
    apiKey?: string;
}

export const translate = async({ query, source, target, format, apiurl, apiKey }: TranslateOptions) => {
    if (!apiurl && !apiKey) throw new TypeError("You need an API key to use the public LibreTranslate API!");
	if (!apiurl) apiurl = "https://libretranslate.com";
	if (!source) source = "auto";

	let availableLanguages: string[] = [];
	availableLanguages.push("auto");

	const res1 = await fetch(`${apiurl}/languages`, {
		method: "GET",
		headers: { "Content-Type": "application/json" }
	})
	
	const languages = await res1.json();
	languages.forEach(language => {
		availableLanguages.push(language.code);
	});
	
	
	if (!availableLanguages.includes(source)) throw new TypeError("This language was not found/does not exist.");
	if (!availableLanguages.includes(target)) throw new TypeError("This language was not found/does not exist.");

	const res2 = await fetch(`${apiurl}/translate`, {
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
	let t = await res2.json();
	return t.translatedText;
  } catch (err) {
	throw err;
  }
}