const events = require("events");
const util = require("util");

/**
 * Make a new Chatbot
 * @param {Object}
 */

module.exports = function runner(ai, opt = {}) {
	if (typeof(ai) !== "object") ai = require("./ai.js");
	if (opt && typeof(opt) !== "object") {
		opt = {};
	} else if (opt && typeof(opt) === "object") {
		if (opt.verbose && typeof(opt.verbose) !== "function") {
			return Error("Verbose Option must be a function");
		}
	}
	if (!opt.verbose) opt.verbose = () => {};
	let v = (log, type) => opt.verbose(`[${(type||"verbose").toUpperCase()}] ${log}`);
	v(`Loaded & Readed ${Object.keys(ai.data).length} Triggers.`, "CHATBOT");
	if (ai.nickname) v(`Bot name: ${ai.nickname}, "CHATBOT"`);
	if (ai.version) v(`Bot version: ${ai.version}`, "CHATBOT");
	bot = function (str, cb) {
			if (typeof(cb) !== "function") return new Error("Callback must be a function");
        	let response = [];
        	let ended = false;
        	v('say() Called', "SAY");
	        return new Promise((res, rej) => {
					let responded = false;
	        		say = (msg, end) => {
	        			responded = true;
	        			v('Called Callbacks.', 'say()');
	        			if (!msg) return v('Empty bot replies. Ignored', 'say()');
	        			cb(msg);
	        			response.push(msg);
	        			if (end) {
	        				v('Ended', 'say()');
	        				res(response.join("\n"));
	        				ended = true;
	        			}
	        		}
        	        str = str.toLowerCase();
	               	Object.keys(ai.data).forEach(async (regex, index) => {
							if (ended || responded) return;
	                        regex = regex.toLowerCase();
	                        v(`Checking ${index+1} of ${Object.keys(ai.data).length} Triggers...`, 'say()');
	                        if (!RegExp(regex).exec(str)) return;
                 	        switch (typeof ai.data[regex]) {
                           		case "object":
                                	if (util.isArray(ai.data[regex])) say(ai.data[regex][Math.floor(Math.random() * ai.data[regex].length)], true);
                                	break;
                            	case "function":
                       	        	if (util.types.isPromise(ai.data[regex])) say(await ai.data[regex](say, str));
                               		say(ai.data[regex](say, str));
                                	break;
                                default:
                               	    say(ai.data[regex], true);
                       	            break;
							}
							v(`Triggers ${index+1} Triggered`, `say()`);
                	});
        	});
	}
	if (ai.nickname) bot.nickname = ai.nickname;
	if (ai.version) bot.version = ai.version;
	if (ai.description) bot.description = ai.description;
	return bot;
}
