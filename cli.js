#!/usr/bin/env node
const chatbotjs = require(".");
const readline = require("readline");
const ms = require("ms");
const util = require("util");
const rl = readline.createInterface(process.stdin, process.stdout);
let scriptPath = __dirname + "/ai.js";
if (process.argv.slice(2)[0] && !process.argv.slice(2)[0].startsWith("-")) scriptPath = process.cwd() + "/" + process.argv.slice(2)[0];
let opt = {}
let sc = require(scriptPath);
process.argv.forEach((i, index) => {
	if (i == "-h" || i == "--help") {
		console.log('\n' +
		process.exit(0);
	}
	if (i == "-fp" || i == "--from-properties") {
		if (!process.argv[index + 1]) return;
		sc = sc[process.argv[index + 1]];
	}
	if (i == "-v" || i == "--verbose") {
		opt.verbose = console.log;
	}
});
let ai = chatbotjs(sc, opt);

rl.setPrompt("(You) ");
rl.on('line', async (str) => {
	process.stdout.write("(chatbot) Thinking.... ");
	process.stdout.cursorTo(0);
	let rtime = Date.now();
	
	ai(str, response => {
		process.stdout.clearLine(0);
		console.log(`(${ai.nickname}) ${response}`, `(Responded in ${ms(Date.now() - rtime)})`);
		rtime = Date.now();
		process.stdout.write(`(${ai.nickname}) Thinking.... `);
		process.stdout.cursorTo(0);
	}).then(() => {
		setTimeout(() => {
			process.stdout.clearLine(0);
			rl.prompt();
		}, 1);
	});
});

rl.on('close', () => {
	console.log("\n(chatbotjs) I'm done now. Have a nice day.");
	process.exit(0);
});

rl.prompt();

process.on('unhandledRejection', (err) => {
	if (opt.verbose) console.error(err);
});