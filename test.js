const { getChatResponse } = require('./chatgpt')
const fs = require('fs')
const path = require('path')

const getChatMessage = async (content) => {
  const response = await getChatResponse({ content })
  return response.message
}

const run = async () => {
  const inputFile = fs.readFileSync(path.join(__dirname, 'input.txt'))
  
  let content = `Summarize the contents of the following text:\n`
  content = `${content} ${inputFile}`

  const chatResponse = await getChatMessage(content)

  console.log('Response:', chatResponse)
}

run()