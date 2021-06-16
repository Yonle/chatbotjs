// ChatbotJS Example AI
let exec = require("child_process").spawnSync;

module.exports = {
	"hello world": "Hi Human!",
	"hello": [
		"Hi there. How are you today?",
		"Hey. it's " + Date(),
		"Hello World!"
	],
	"hey": [
		"Heyya. How's your day?"
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
	"oma*a mou sinde*u": "NANI?!",
	"rps": function (say, str) {
		let rps = ["r", "p", "s"];
		let cpu = rps[Math.floor(Math.random() * rps.length )];
		let user = str.split(" ").slice(1)[0]

		if (!user) return say("Hey. Let me teach ya how to play.\nType 'rps <argument>' to play the game. The arguments are:\nr = rock (Or simply type rock as argument)\np = paper (Or simply type paper as argument)\ns = scissors (Or simply type scissors as argument)\n\nExample: rps r");
		let translated = {
			r: "Rock",
			p: "Paper",
			s: "Scissors"
		}

		user = user.slice(0, 1);

		if (!translated[user]) return say("Oops... Seems like that's invalid argument. Type \"rps\" for info.");
		if (user == cpu) {
			say(`You're ${translated[user]}, I'm ${translated[cpu]}. Whoa, We're tie! Try again!`);
		} else if (user == "r" && cpu == "p") {
			say(`You're Rock, I'm Paper. You're lose, I'm Win! Yay!`);
		} else if (user == "r" && cpu == "s") {
			say(`You're Rock, I'm Scissors.\nWhoops. Seems like my scissors broken now. You're win!`);
		} else if (user == "p" && cpu == "r") {
			say(`You're Paper, I'm Rock. Oh man, You just ate my rock. What a great. You're win!`);
		} else if (user == "p" && cpu == "s") {
			say(`You're Paper, I'm Scissors.\nEh, Let me cut ya Paper\n*cuts it* How is it? Now i'm win, You're lose. Try again!`);
		} else if (user == "s" && cpu == "p") {
			say(`You're Scissors, I'm Paper. Uh oh-\n(You) *cuts it*\n(chatbot) Whoa. You cut my paper. You're win!`);
		} else if (user == "s" && cpy == "r") {
			say(`You're Scissors, I'm Rock.\n(Rock) *nom*\n(chatbot) You're lose. Try again!`);
		} 
	},
	"bye": function (say, str) {
		say("See you next time. Bye!");
		process.exit(0);
	},
	"rickroll|never gonna give you up": function(say) {
		try {
			exec("xdg-open", ["https://fwesh.yonle.repl.co"]);
			say("Are you sure about that?");
		} catch (error) {
			say("WHY YOU RICKROLL ME!?!?");
		}
	},
	"what is|how to|who is|who are|what do|what are|who do|ok google|who's": function (say, str) {
		if (RegExp("ok google").exec(str)) str = str.split(" ").slice(2).join(" ");
		if (!str.length) return;
		try {
			exec("xdg-open", [decodeURI("https://letmegooglethat.com/?q=" + str)]);
			say("Hold there....");
		} catch (error) {
			say("I don't know.");
		}
	},
	"no": "Okay.",
	"rm": "Executing  rm without Sudo.\n(chatbot) Not Hackerman.",
	"sudo": (say, str) => say(`Executing ${str}.\n(chatbot) HACKERMAN :OOO`),
	"": ["Hmmmm", "Want some coffe?", "I see", "🤔🤔🤔", "Did you know: If i'm slow / Invalid / Weird, You can run it in Quick mode with -q argument in ChatbotJS?"],
}
