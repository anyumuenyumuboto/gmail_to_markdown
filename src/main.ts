// main.ts

import "./style.css";
import "@picocss/pico";

import ClipboardJS from "clipboard";
import $ from "jquery";
import TurndownService from "turndown";

new ClipboardJS(".btn");

// GAS 型定義（前回と同じ）
declare namespace google {
	namespace script {
		interface Run {
			withSuccessHandler<T>(handler: (response: T) => void): Run;
			withFailureHandler(handler: (error: { message: string }) => void): Run;
			doFetchGmail(query: string): void;
		}
		const run: Run;
	}
}

// メイン処理
const main = (): void => {
	// 入力フォームを追加
	createInputForm(document.body);
};

const createInputForm = (parentElement: HTMLElement): void => {
	const form = $("<form>").appendTo(parentElement);

	// 入力フィールド
	const input = $("<input>")
		.attr("type", "text")
		.attr("placeholder", "Gmail 検索クエリを入力")
		.addClass("input")
		.appendTo(form);

	// 送信ボタン
	$("<button>")
		.attr("type", "submit")
		.addClass("btn")
		.text("検索")
		.appendTo(form);

	// フォーム送信時の処理
	form.on("submit", (e) => {
		e.preventDefault();
		const query = input.val() as string;

		if (!query) {
			alert("検索クエリを入力してください");
			return;
		}

		google.script.run
			.withSuccessHandler((response: string) => {
				console.debug("Success:", response);
				const markdown = createMarkdownFromHtml(response);
				createMarkdownBlock(markdown, document.body, "gmail-markdown");
			})
			.withFailureHandler((error: { message: string }) => {
				console.error("GAS function failed:", error.message);
			})
			.doFetchGmail(query);
	});
};

// Markdown 変換関数
const createMarkdownFromHtml = (html: string): string => {
	const turndownService = new TurndownService({
		headingStyle: "atx",
		codeBlockStyle: "fenced",
		emDelimiter: "*",
	});
	return turndownService.turndown(html);
};

const createMarkdownBlock = (
	markdown: string,
	parentElement: HTMLElement,
	blockId: string,
): void => {
	const codeBlockContainer = $("<div>")
		.addClass("qiita-code-block-container")
		.appendTo(parentElement);

	const pre = $("<pre>")
		.addClass(["overflow-auto"])
		.appendTo(codeBlockContainer);
	$("<code>").attr("id", blockId).text(markdown).appendTo(pre);

	const copyIconSVG = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>`;

	$("<button>")
		.attr("data-clipboard-target", `#${blockId}`)
		.addClass(["btn", "copy-button"])
		.html(copyIconSVG) // SVGをHTMLとして挿入
		.appendTo(codeBlockContainer);
};

// DOM 読み込み後に実行
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", main);
} else {
	main();
}
