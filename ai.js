// ChatbotJS Example AI
let exec = require("child_process").spawnSync;
let fs = require("fs");

let data = {
	"hello world": "Hi Human!",
	"hello": [
		"Hi there. How are you today?",
		"Hey. it's " + Date(),
		"Hello World!"
	],
	"hey": [
		"Heyya. How's your day?"
	],
	"who are you": [
		"I'm demobot",
		"I'm Demonstration bot"
	],
	"How are you": [
		"Feeling great",
		"A little bored",
		"Maan, It's very hot today.",
		"My man is hot right now coz ur CPU is hot."
	],
	"fine": [
		"Wanna take a break?",
		"Want some coffe?",
		"Did you finished your homework?"
	],
	"yes|sure": [
		"(ツ) I wanna say something. This AI is made by Yonle in Javascript power itself.",
		"Why no man :^)\nHere's your coffe.",
		"Whoaa seems like you're lying"
	],
	"i love you": "😳",
	"who is yonle": [
		"He's my creator",
		"He's a javascript Developer that made a cool thing, Yet"
	],
	"fuck": [
		"Oh c'mon",
		"Why you swear like that?"
	],
	"chatbotjs": "Yes it's me. ChatbotJS.",
	"bored": [
		"Oh yeah? Try type \"rps r\"",
		"Relax :^)"
	],
	"you* weird*": [
		"Because i'm only a demo",
		"Oh hey. I'm only a demonstrstion, Not a full chat bot lol."
	],
	"lol": [
		"🤣🤣🤣",
		"Oh yea i got it lol"
	],
	"stfu": [
		"🖕👁️👄👁️🖕",
		"no u"
	],
	"no *u": [
		"yes u",
		"no u"
	],
	"yes *u": [
		"no u",
		"yes u"
	],
	"uno reverse card": [
		"ANTHY - ANTHY UHNO REFWEWS CAWD AKTIFAT!!!!!",
		"NOOOOOOOOOOOOOOOOOO",
		"NO WAYYYY!!!!!!!!!!"
	],
	"haha": [
		":^)"
	],
	"demobot": (say, str) => {
		let method = str.split(" ").slice(1)[0];
		if (!method) {
			say("Usage: demobot [method]");
			say("");
			say("Method List:");
			say(" update - Update Demobot");
			say("");
			say("Demobot is a Demonstration bot that used for ChatbotJS. Keep in mind that not all feature is working on Demobot.", true);
		} else if (method === "update") {
			say("Updating.... Please wait....");
			require("https").get("https://yonle.github.io/demoai/ai.js", stream => {
				say("Connected. Start updating....");
				stream.pipe(fs.createWriteStream(__dirname + "/ai.js"));
				stream.on('end', () => {
					say("I'm done. Now restart chatbotjs", true);
				});
			}).on('error', (err) => {
				say("I had a error while updating.");
				say(err.toString());
				say("Please try again later.", true);
			});
		}
	},
	"oma*a mou sinde*u": "NANI?!",
	"rps": function (say, str) {
		let rps = ["r", "p", "s"];
		let cpu = rps[Math.floor(Math.random() * rps.length )];
		let user = str.split(" ").slice(1)[0]

		if (!user) return say("Hey. Let me teach ya how to play.\nType 'rps <argument>' to play the game. The arguments are:\nr = rock (Or simply type rock as argument)\np = paper (Or simply type paper as argument)\ns = scissors (Or simply type scissors as argument)\n\nExample: rps r", true);
		let translated = {
			r: "Rock",
			p: "Paper",
			s: "Scissors"
		}

		user = user.slice(0, 1);

		if (!translated[user]) return say("Oops... Seems like that's invalid argument. Type \"rps\" for info.", true);
		if (user == cpu) {
			say(`You're ${translated[user]}, I'm ${translated[cpu]}. Whoa, We're tie! Try again!`, true);
		} else if (user == "r" && cpu == "p") {
			say(`You're Rock, I'm Paper. You're lose, I'm Win! Yay!`, true);
		} else if (user == "r" && cpu == "s") {
			say(`You're Rock, I'm Scissors.\nWhoops. Seems like my scissors broken now. You're win!`, true);
		} else if (user == "p" && cpu == "r") {
			say(`You're Paper, I'm Rock. Oh man, You just ate my rock. What a great. You're win!`, true);
		} else if (user == "p" && cpu == "s") {
			say(`You're Paper, I'm Scissors.\nEh, Let me cut ya Paper\n*cuts it* How is it? Now i'm win, You're lose. Try again!`, true);
		} else if (user == "s" && cpu == "p") {
			say(`You're Scissors, I'm Paper. Uh oh-\n(You) *cuts it*\n(chatbot) Whoa. You cut my paper. You're win!`, true);
		} else if (user == "s" && cpy == "r") {
			say(`You're Scissors, I'm Rock.\n(Rock) *nom*\n(chatbot) You're lose. Try again!`, true);
		} 
	},
	"bye": function (say, str) {
		say("See you next time. Bye!");
		process.exit(0);
	},
	"rickroll|never gonna give you up": function(say) {
		say("Uh oh?");
		try {
			exec("xdg-open", ["https://fwesh.yonle.repl.co"]);
			say("Are you sure about that?", true);
		} catch (error) {
			say("WHY YOU RICKROLL ME!?!?", true);
		}
	},
	"how can|what is|how to|who is|who are|what do|what are|who do|ok google|who's": function (say, str) {
		if (RegExp("ok google").exec(str)) str = str.split(" ").slice(2).join(" ");
		if (!str.length) return;
		say("Hold there....");
		try {
			exec("xdg-open", [decodeURI("https://letmegooglethat.com/?q=" + str)]);
			say("Let me google that....", true);
		} catch (error) {
			say("I don't know.", true);
		}
	},
	"no": "Okay.",
	"rm": "Executing  rm without Sudo.\n(chatbot) Not Hackerman.",
	"sudo": (say, str) => say(`Executing ${str}.\n(chatbot) HACKERMAN :OOO`, true),
	"deez nut": [
		"mogan deez nut yo mama",
		"Oh no, cringe"
	],
	"cringe": () => process.exit(666),
	"weeb": "I'm not even weeb",
	"ohay*": "朝食は済ませましたか？",
	"dumb": "I'm not a professional AI as how do you expected.",
	"bitch": () => process.exit(0),
	"noob": "I'm not gamer",
	"help": "?",
	"i'm broke": [
		"What was makes you feels broken?",
	],
	"hey alexa": () => {},
	"": ["Hmmmm", "Want some coffe?", "I see", "🤔🤔🤔", "Sorry. I didn't Understand. Try do `demobot update`", "While i'm seems outdated"],
}

// Identity
module.exports = {
	// Bot name
	nickname: "Demobot",
	// Bot version
	version: "1.0.4",
	// Bot description
	description: "A chatbot that used to demonstrate ChatbotJS",
	// Data, Thw triggers.
	data
}
