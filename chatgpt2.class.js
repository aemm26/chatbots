const { CoreClass } = require("@bot-whatsapp/bot");
const { Configuration } = require("openai");

//const Configuration = require("openai").Configuration;
const OpenAIApi = require("openai").OpenAIApi;

/**
const Configuration = new Configuration({
    apiKey: "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",
    organization: "org-NNHnI2cwDob41qHYgIWnjY5g"   
 })
*/
 //const openai = new OpenAIApi(configuration);

 /**
 async function main() {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "cuentáme un chiste",  
    });

 }

 main();*/

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

    module.exports = ChatGPTClass2;

}
