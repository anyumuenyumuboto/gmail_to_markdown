import TurndownService from "turndown";

main = () => {
	console.log("hello");
	google.script.run
		.withSuccessHandler((response) => {
			const tamesi: string = "動作テスト";
			console.debug(tamesi);
			console.debug(response);
		})
		.withFailureHandler((error) => {
			console.debug(`doFetchGmail関数が動作しませんでした: ${error.message}`);
		})
		.doFetchGmail("tamesi");
	// window.alert("tests");

	// For Node.js
	// var TurndownService = require("turndown");

	var turndownService = new TurndownService({ headingStyle: "atx" });
	var markdown: string = turndownService.turndown("<h1>Hello world!</h1>");
	console.log(markdown);

	var bodyElement = document.body;
	var tamesiElement = document.createElement("p");
	// var tamesiContent = document.createTextNode("tamesi");
	var tamesiContent = document.createTextNode(markdown);
	tamesiElement.appendChild(tamesiContent);
	bodyElement.insertBefore(tamesiElement, bodyElement.firstChild);
};
main();
