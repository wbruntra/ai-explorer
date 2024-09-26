const axios = require('axios')
const secrets = require('./secrets')
const _ = require('lodash')

const calculateCost = (model, usage) => {
  const cost = {
    'gpt-4o-mini-2024-07-18': {
      prompt_tokens: 0.15,
      completion_tokens: 0.6,
    },
    ['gpt-4o-2024-05-13']: {
      prompt_tokens: 5,
      completion_tokens: 15,
    },
    ['gpt-4o-2024-08-06']: {
      prompt_tokens: 2.5,
      completion_tokens: 10,
    },
  }

  const { prompt_tokens, completion_tokens } = usage

  const costModel = cost[model]

  if (!costModel) {
    console.log('Error: Cost model not found for model', model)
    return 0
  }

  const oneMillion = Math.pow(10, 6)

  return (
    (prompt_tokens / oneMillion) * costModel.prompt_tokens +
    (completion_tokens / oneMillion) * costModel.completion_tokens
  )
}

const getChatResponse = async ({ content, model = 'gpt-4o-mini', json = false, max_tokens }) => {
  console.log('Sending query to ChatGPT API...')

  const models = {
    [`gpt-4o`]: `gpt-4o-2024-08-06`,
    [`gpt4`]: `gpt-4-turbo-preview`,
    [`gpt4o`]: `gpt-4o-2024-08-06`,
    [`gpt-4o-mini`]: `gpt-4o-mini-2024-07-18`,
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: models[model],
        messages: [
          {
            role: 'system',
            content: json
              ? 'You are a helpful assistant designed to output JSON.'
              : 'You are a helpful assistant.',
          },
          { role: 'user', content: content },
        ],
        response_format: json ? { type: 'json_object' } : undefined,
        max_tokens: max_tokens ? max_tokens : undefined,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${secrets.open_ai_key}`,
        },
      },
    )

    const { finish_reason } = response.data.choices[0]

    if (finish_reason !== 'stop') {
      console.log('Error: ChatGPT API did not generate a command.')
      return
    }

    const message = response.data.choices[0].message.content

    const cost = models[model] ? calculateCost(models[model], response.data.usage) : 0

    console.log('Cost:', cost)

    return {
      message,
      usage: response.data.usage,
      model: response.data.model,
      cost,
    }
  } catch (error) {
    console.error(
      'Error making request to ChatGPT API:',
      error.response ? error.response.data : error.message,
    )
  }
}

if (require.main === module) {
  const content = `Hi! This is just a test message. Let me know if my setup is working!`

  getChatResponse(content).then((message) => {
    console.log('Message:', message)
  })
}

module.exports = {
  getChatResponse,
}
