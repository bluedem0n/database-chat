// test/openAIApi.spec.js

import { communicateWithOpenAI } from '../src/lib/openAIApi.js';
import { getApiKey } from '../src/lib/apiKey.js';

jest.mock('../src/lib/apiKey.js');

describe('communicateWithOpenAI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debería lanzar un error si la API Key está ausente', async () => {
    getApiKey.mockReturnValue(null); // Simula que no hay API Key

    await expect(communicateWithOpenAI([])).rejects.toThrow('API Key is missing or invalid');
  });

  test('debería enviar un mensaje y recibir una respuesta exitosa de OpenAI', async () => {
    getApiKey.mockReturnValue('test-api-key');

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            choices: [{ message: { content: 'Respuesta simulada de OpenAI' } }],
          }),
      })
    );

    const messages = [
      { role: 'system', content: 'You are an assistant.' },
      { role: 'user', content: 'Hola' },
    ];

    const response = await communicateWithOpenAI(messages);
    expect(response).toBe('Respuesta simulada de OpenAI');
    expect(global.fetch).toHaveBeenCalledWith('https://api.openai.com/v1/chat/completions', expect.any(Object));
  });

  test('debería lanzar un error si la API responde con un error', async () => {
    getApiKey.mockReturnValue('test-api-key');

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: { message: 'Error interno del servidor' } }),
      })
    );

    const messages = [
      { role: 'system', content: 'You are an assistant.' },
      { role: 'user', content: 'Hola' },
    ];

    await expect(communicateWithOpenAI(messages)).rejects.toThrow('Error: 500, Details: Error interno del servidor');
  });
});
