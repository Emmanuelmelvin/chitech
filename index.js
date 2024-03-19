#!/usr/bin/env node

const axios = require('axios');
const inqurirer = require('inquirer')
// const yargs = require('yargs');
// const { argv } = yargs(process.argv)

var status = 'not-ready'

const options = {
  method: 'POST',
  url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '99c7f6a833msh0f8dc93e0f54be3p198904jsn4fd9eefd0cbf',
    'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
  },
  data: {
    messages: [
      {
        role: 'user',
        content: ""
      
      }
    ],
    system_prompt: '',
    temperature: 0.9,
    top_k: 5,
    top_p: 0.9,
    max_tokens: 256,
    web_access: false
  }
};
// data.message.content will be argv.content

const prompt= inqurirer.createPromptModule();

 const callPrompt  = () => {
  prompt([{
    type: "input",
    name: 'message',
    message: 'Type a message   >>>'
  }])
 . then((answers) => {
    options.data.messages[0].content = answers.message
    getData()
  } )
}

const getData = async  () => {
    try {
        const response = await axios.request(options);
        console.log(response.data.result);
        console.log('\n')
        status = 'ready'
    } catch (error) {
        console.error(error);
    }
}

callPrompt()

setInterval(()=> {
  if(status == "ready"){
    callPrompt()
  }
  status = 'not-ready'
}, 3000)
 