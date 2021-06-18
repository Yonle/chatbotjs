# ChatbotJS Docs for v0.0.3
A docs for ChatbotJS v0.0.3 and so on

#### Table of Context
- [Module](#module)
  - [`runner`](#runner)
  - [`bot`](#bot)
- [Creating your own AI](#creatingyourownai)
  - [Hello World](#helloworld)
  - [Random Response](#randomresponse)
  - [Engines (Function)](#engines)
  - [Metadata](#metadata)
  - [Notice](#notice)

## Module
To using ChatbotJS as a module, Do `require("@yonle/chatbotjs")`.

### `runner`
A function that used for load & reading a Object for AI. Returns [`bot`](#bot) after calling [`runner`](#runner).

```
<runner>(<Object>, <Options>)
```

#### Options
##### `verbose` A options that used for Logging any Debug logs. Must provide a function.
```js
<runner>(...., {
	verbose: log => console.log(log)
})
```

#### Example

```js
// Chatbot Script
const ai = require("./myAi.js");

// Use ChatbotJS and load them
const ChatbotJS = require("@yonle/chatbotjs");
const chatbot = ChatbotJS(ai);

// Or

const chatbot = ChatbotJS({
	data: {
		....
	}	
});
```

### `bot`
A function that used to speak with your AI. Returns `Object`.

```
<bot>(Message<String>, <Callback>)
```

#### Message
A message that used to speak with your AI.

```js
/**
 * @param message <String>
 * @param callback <Function>
 */
 
<bot>("Hello. How are you?", message => {
	console.log(message);
}).then(() => {
	// A promise will resolved after bot end it's response
	console.log("Bot stop typing.");
});
```

This can also done without Callbacks.

```js
<bot>("Hello. How are you?").then(message => console.log(message));
```

#### `nickname`
A properties that returns Bot name. Only available if the object has it's metadata on it. Returns `String`.
```js
<bot>.nickname // 'Demobot'
```

#### `version`
A properties that returns Bot Version. Only available if the object has it's metadata on it. Returns `String|Number`.
```js
<bot>.version // '0.0.3'
```

#### `description`
A properties that returns Bot Description. Only available if the object has it's metadata on it. Returns `String`.
```js
<bot>.description // 'A chatbot that used to demonstrate ChatbotJS'
```

#### Example
This example uses Readline to Demonstrate. 
```js
const readline = require("readline");
const ChatbotJS = require("@yonle/chatbotjs");
// We're gonna use DemoBot, As it's a only a chatbot that used for demonstrate chatbotjs while there's no object provided.
const chatbot = ChatbotJS();

// Make Readline Interface
const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt("You: ");
// When you're Typing....
rl.on('line', (str) => {
	chatbot(str, message =>{
		console.log(message);
	}).then(() => {
		// Bpt finished reply to your response
		rl.prompt();
	});
});

rl.prompt();
```

## Creating your own AI
### Hello World
It's very easy to create your own AI. Let's start from Hello world:
```js
module.exports = {
	data: {
		"hello": "Hello World!"
	}
}
```
Then save it as `ai.js`, Then run `chatbotjs ai.js` and Do this:
```
(You) Hello
```
Then Press ENTER. Your bot should respond with `Hello World!` as well.

#### Can i use Regular Expression?
Yes. You can do it for Triggering a message.
```js
{
	data: {
		"hello|hi": "Hello There!"
	}
}
```

You can also make a trigger for unknow message
```js
{
	data: {
		"hello|hi": "Hello There!",
		// Here, a trigger for unknow message
		"": [
			"Sorry. I didn't understand what you mean",
			"I see"
		]
	}
}
```
**Remember:** Unknow Response trigger must be put in the end of Object. Putting it on anywhere can result in Skipped Trigger.
### Random Response
Sometime, AI response in random message, right? That's why we made this feature. We're let you to use Array to Response in Random Message. Something it looks like this:
```js
// in ai.js
module.exports = {
	"hello": [
		"Hi. How are you today?",
		"Hi Human. It's nice to see you there",
		"Oh hi there. Nice to see you buddy"
	]
}
```

Then run `chatbotjs ai.js` and say "Hello" 3-5 (or more) time. Your AI should response in random response.

### Engines
Did you know that you can make your AI into Powerful AI with Function? Yes. Sometime we made this for a dev that wants to do something Fancy on their AI which is cool.

So here's a thing that you should know:
```
...
	data: {
		// Reply, A function that used for Replying to User Message.
		// |_____________________________
		//                               |
		// Message. Returns string of Use|r Message.
		// |____________________________________
		//                               ↓      ↓
		"hello|hi|hey|hallo": function (reply, msg) {
			reply("Oh hello there");
			reply("It's nice to meet you there", true);
		}
	}
...
``` 

#### `reply`
A function that used for replying to a user message.

```
/**
 * @param message <String>
 * @param End of replying message? <Boolean>
 */
 reply("Hey. I'm gonna type 2 message in row.");
 reply("And i'm stop at here. Also Promise is resolved after end of replies.", true);
```

#### `msg`
A properties that returns String of user message.

### Example
See [here](https://github.com/Yonle/demoai/blob/main/ai.js#L98).

## Metadata
Did you know that you can fill information about your bot? Here's how you do this:
```js
module.exports = {
	nickname: "My AI",
	version: "1.0.0 Demo",
	description: "My First AI",

	data: {
		// ....
	}
}
```
The metadata will shows up at [`bot`](#bot).

## Notice
### 1. Do not do this:
```
{
	data: {
		"hello": "Hi",
		"hello, how are you": "I'm fine. Thanks"
	}
}
```
This will result in `Hi` instesd of `I'm fine. Thanks` while saying `Hello. How are you`. 
#### The correct way
```
{
	data: {
		"hello, how are you": "I'm fine. Thanks",
		"hello": "Hi"
	}
}
```

### 2. Do not call `reply` without `EndMessage?` argument
if you use it for end of message without adding `EndMessage?` argument. This can result in Thinking Forever.
```
{
	data: {
		"hello": (reply) => {
			reply("Hi");
		}
	}
}
```
When you ran it:
```
(You) Hello
(Chatbot) Hi
(Chatbot) Thinking....
# This part is where your bots think forever
```
#### The correct way
For multiple Response:
```js
function (reply) {
	reply("Hold there, I'm going to get my bag");
	// Set it as true at second params if it's a end of response
	// |____________________________
	//                              ↓
	reply("I'm ready. Let's go!", true);
}
``` 
For single Response:
```js
function (reply) {
	reply("Stay safe everyone, Including You!", true);
}
```

## Any Question?
You can always find us at [Discord Server](https://dsc.gg/yonle) or [Telegram Group](https://t.me/yonlecoder).
