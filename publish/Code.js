/* biome-ignore lint/correctness/noUnusedVariables: GASのエントリポイント */
function doGet() {}
("use strict");
(() => {
	// src/main.ts
	function doGet() {
		// return HtmlService.createHtmlOutput(`<h1>Success! (v2)</h1>`);
		return HtmlService.createTemplateFromFile("index").evaluate();
	}
	this.doGet = doGet;
})();

/* biome-ignore lint/correctness/noUnusedVariables: GASのエントリポイント */
function doFetchGmail(keyword) {
	// const keyword = 'example'; // 検索するキーワード

	// var threads = GmailApp.search('in:inbox ' + keyword); // インボックス内でキーワードを含むメールを検索
	// return "<p>これは<strong>太字</strong>と<em>斜体</em>のテキストです。</p>"
	return getMailBodyByTitle(keyword);
}

function _tamesi() {
	const tamesi = getMailBodyByTitle("tamesi");
	Logger.log(tamesi);
}
function getMailBodyByTitle(title) {
	// 件名でスレッドを検索
	var threads = GmailApp.search(`subject:"${title}"`);

	if (threads.length === 0) {
		Logger.log("指定の件名のメールは見つかりませんでした。");
		return null;
	}

	// 最初のスレッドを取得
	var thread = threads[0];
	// スレッドの中の最新メッセージを取得（必要に応じて変更可能）
	var message = thread.getMessages()[0];

	// 本文（HTMLとプレーンテキスト両方がある）
	var plainBody = message.getPlainBody();
	var htmlBody = message.getBody();

	Logger.log(`Plain Body:\n${plainBody}`);
	Logger.log(`HTML Body:\n${htmlBody}`);

	// 返す内容を必要に応じて選択
	return htmlBody;
}
