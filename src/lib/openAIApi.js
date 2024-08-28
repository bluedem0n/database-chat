import { getApiKey } from './apiKey.js';

export const communicateWithOpenAI = async (messages) => {
  const APIKEY = getApiKey();

  if (!APIKEY) {
    throw new Error('API Key is missing or invalid');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${APIKEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: messages,
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(`Error: ${response.status}, Details: ${errorDetails.error.message}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
