// main.ts
import TurndownService from "turndown";

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

// Markdown 変換関数
const createMarkdownFromHtml = (html: string): string => {
	const turndownService = new TurndownService({
		headingStyle: "atx",
		codeBlockStyle: "fenced",
		emDelimiter: "*",
	});
	return turndownService.turndown(html);
};

// メイン処理
const main = (): void => {
	console.log("App started");

	google.script.run
		.withSuccessHandler((response: string) => {
			console.debug("Success:", response);
			const markdown = createMarkdownFromHtml(response);

			const p = document.createElement("p");
			p.style.whiteSpace = "pre-wrap"; // 改行を保持
			p.textContent = markdown;
			document.body.insertBefore(p, document.body.firstChild);
		})
		.withFailureHandler((error: { message: string }) => {
			console.error("GAS function failed:", error.message);
		})
		.doFetchGmail("tamesi");
};

// DOM 読み込み後に実行
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", main);
} else {
	main();
}

// // main.ts
// import TurndownService from "turndown";
//
// // === GAS の外部オブジェクトの型定義 ===
// declare namespace google {
//   namespace script {
//     interface Run {
//       withSuccessHandler<T>(handler: (response: T) => void): Run;
//       withFailureHandler(handler: (error: { message: string }) => void): Run;
//       doFetchGmail(query: string): void;
//     }
//     const run: Run;
//   }
// }
//
//
// const main = () => {
// 	console.log("hello");
// 	google.script.run
// 		.withSuccessHandler((response: string) => {
// 			const tamesi: string = "動作テスト";
// 			console.debug(tamesi);
// 			console.debug(response);
// 		})
// 		.withFailureHandler((error) => {
// 			console.debug(`doFetchGmail関数が動作しませんでした: ${error.message}`);
// 		})
// 		.doFetchGmail("tamesi");
//
// 	var turndownService = new TurndownService({ headingStyle: "atx" });
// 	var markdown: string = turndownService.turndown("<h1>Hello world!</h1>");
// 	console.log(markdown);
//
// 	var bodyElement = document.body;
// 	var tamesiElement = document.createElement("p");
// 	var tamesiContent = document.createTextNode(markdown);
// 	tamesiElement.appendChild(tamesiContent);
// 	bodyElement.insertBefore(tamesiElement, bodyElement.firstChild);
// };
//
// const createMarkdownTextContentFromGmail = (gmailContent:string) => {
// 	return "markdownの文字列";
// };
//
// // DOMロード後に実行
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', main);
// } else {
//   main();
