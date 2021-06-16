#!/usr/bin/env node
const readline = require("readline");
const ms = require("ms");
const util = require("util");
const rl = readline.createInterface(process.stdin, process.stdout);
let scriptPath = __dirname + "/ai.js";
if (process.argv.slice(2)[0] && !process.argv.slice(2)[0].startsWith("-")) scriptPath = process.cwd() + "/" + process.argv.slice(2)[0];
let ai = require(scriptPath);
let array = Object.keys(ai);
let debug = false;
let quick = false;
process.argv.forEach((i, index) => {
	if (i == "-h" || i == "--help") {
		console.log('\n' +'Usage: chatbotjs [file] [options]\n' +'\n' +'ChatbotJS - A simple runner that allows user to chat with Chatbot script\n' +'\n' +'ChatbotJS Options:\n' +'\n' + ' -v  --verbose         - Verbose any debug log\n' + ' -fp --from-properties - Read from Properties\n' + '                         Example: Script.js:\n' + '                         module.exports = { \n' + '                           data: {\n' +'                             // ....\t\n' + '                           }\n' +'                         }\n' + '\n' + "                         And we're gonna read it from `data` properties. So:\n" +'\n' + '                         you@localhost ~ $ chatbotjs Script.js -dp data\n' +' -q  --quick           - Quick mode. Make AI respond way more faster than normal. But not recommended in Production\n' +' \n');
		process.exit(0);
	}
	if (i == "-fp" || i == "--from-properties") {
		if (!process.argv[index + 1]) return;
		ai = ai[process.argv[index + 1]];
	}
	if (i == "-v" || i == "--verbose") {
		debug = true;
		console.warn("WARNING: DISABLE VERBOSE MODE IF YOU DIDN'T KNOW ANYTHING. IF YOU UNDERSTAND WHAT DID YOU DO, USE THIS AT YOUR OWN RISK");
		console.log("Found Trigger:", Object.keys(ai).join(", "));
	}
	if (i == "-q" || i == "--quick") {
		quick = true;
		console.warn("(chatbotjs) Quick mode enabled. Response is more faster than before, But not recommend to use in Production.");
	}
});
function getResponse(str) {
	let response = [];
	if (debug) console.log("getResponse() called");
	if (debug) console.log("Searching....")
	return new Promise((res, rej) => {
		str = str.toLowerCase();
		//if (!array.includes(str));
		Object.keys(ai).forEach(async (regex, index) => {
			if (quick && response.length) return;
			regex = regex.toLowerCase();
			if (RegExp(regex).exec(str) && typeof ai[regex] === "string") {
				return response.push(ai[regex]);
			} else if (RegExp(regex).exec(str) && typeof ai[regex] !== "string") {
				switch (typeof ai[regex]) {
					case "object":
						if (util.isArray(ai[regex])) {
							response.push(ai[regex][Math.floor(Math.random() * ai[regex].length)]);
						} else {
							response.push(await getResponse(ai[regex]));
						}
						break;
					case "function":
						if (util.types.isPromise(ai[regex])) return response = await ai[regex](res, str);
						response.push(ai[regex](res, str));
						break;
					default:
						response.push(ai[regex]);
						break;
				}
			}
			if (index === Object.keys(ai).length-1) timing = 1;
			if (debug) console.log("Checked Param:", `${index} of ${Object.keys(ai).length-1}`);
			if (!quick && index === Object.keys(ai).length-1) return res(response[Math.floor(Math.random() * response.length)]);
			if (quick && response.length) return res(response[Math.floor(Math.random() * response.length)]);
		});
	});
}

rl.setPrompt("(You) ");
rl.on('line', async (str) => {
	process.stdout.write("(chatbot) Thinking.... ");
	process.stdout.cursorTo(0);
	let rtime = Date.now();
	response = await getResponse(str);
	if (!response) response = ai[Object.keys(ai)[Math.floor(Math.random() * Object.keys(ai).length)]];
	process.stdout.clearLine(0);
	console.log(`(chatbot) ${response}`, `(Responded in ${ms(Date.now() - rtime)})`);
	rl.prompt();
});

rl.on('close', () => {
	console.log("\n(chatbotjs) I'm done now. Have a nice day.");
	process.exit(0);
});

rl.prompt();

process.on('unhandledRejection', (err) => {
	if (debug) console.error(err);
});
