// src/markdown.ts

import TurndownService from "turndown";

/**
 * HTML文字列をMarkdown文字列に変換します。
 * @param html HTML文字列
 * @returns Markdown文字列
 */
export const createMarkdownFromHtml = (html: string): string => {
	const turndownService = new TurndownService({
		headingStyle: "atx",
		codeBlockStyle: "fenced",
		emDelimiter: "*",
	});
	turndownService.remove(["style", "script"]);
	return turndownService.turndown(html);
};
