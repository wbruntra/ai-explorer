const { getChatResponse } = require('./chatgpt')

const getChatMessage = async (content) => {
  const response = await getChatResponse({ content })
  return response.message
}

const run = async () => {

  let content = `Who won the Super Bowl in 1996?`

  const chatResponse = await getChatMessage(content)

  console.log('Response:')
  console.log(chatResponse)
}

run()
