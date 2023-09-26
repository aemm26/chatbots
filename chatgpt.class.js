//import {Configuration, OpenAIApi} from "openai"
//const { CoreClass } = require("@bot-whatsapp/bot");
const OpenAIApi = require("openai").OpenAIApi;


const completion = async (dataIn = '') => {
  const configuration = new Configuration ({
    apikey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: dataIn,
    max_tokens: 256,
    temperature: 0,
  });
    module.exports = completion;
  //module.exports = ChatGPTClass2;
  //return response
}

//export default {completion};



const { CoreClass } = require("@bot-whatsapp/bot");

class ChatGPTClass extends CoreClass {
   queue = [];
   optionsGPT = { model: "text-davinci-003"};
   openai = undefined;
   constructor(_database, _provider, _optionsGPT = {}) {
     super(null, _database, _provider);
     this.optionsGPT = {...this.optionsGPT, ..._optionsGPT};
     this.init().then();
   }

init = async () => {
    const { ChatGPTAPI } = await import("chatgpt");
    this.openai = new ChatGPTAPI({
        apikey: process.env.OPENAI_API_KEY,
    });
};

handleMsg = async (ctx) => {
    const { from, body } = ctx;

    const completion = await this.openai.sendMessage(body, {
        conversationId: !this.queue.length
          ? undefined
          : this.queue[this.queue.length - 1].conversationId,
        parentMessageId: !this.queue.length
          ? undefined
          : this.queue[this.queue.length - 1].Id,
    });

    this.queue.push(completion);

    const parseMessage = {
        ...completion,
        answer: completion.text,
    };

    module.exports = ChatGPTClass;

}
}
