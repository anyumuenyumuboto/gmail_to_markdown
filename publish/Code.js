function doFetchGmail(keyword) {
// const keyword = 'example'; // 検索するキーワード
	
  // var threads = GmailApp.search('in:inbox ' + keyword); // インボックス内でキーワードを含むメールを検索
	return "mofusando"
}

var global = this;
function doGet() {
}
"use strict";
(() => {
  // src/main.ts
  function doGet() {
    // return HtmlService.createHtmlOutput(`<h1>Success! (v2)</h1>`);
    return HtmlService.createTemplateFromFile('index').evaluate();
  }
  global.doGet = doGet;
})();

