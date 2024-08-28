import { getApiKey, setApiKey } from '../src/lib/apiKey.js';

describe('getApiKey', () => {

  it('debería devolver el valor de la API Key almacenada en localStorage', () => {
    const apiKey = 'twd123321';
    localStorage.setItem('marvelApiKey', apiKey);
    const result = getApiKey();
    expect(result).toBe(apiKey);
  });

  it('debería devolver null si no hay ninguna API Key almacenada en localStorage', () => {
    localStorage.removeItem('marvelApiKey');
    const result = getApiKey();
    expect(result).toBeNull();
  });
});

describe('setApiKey', () => {

  it('debería establecer correctamente la API Key en localStorage', () => {
    const apiKey = 'newTestApiKey456';
    setApiKey(apiKey);
    expect(localStorage.getItem('marvelApiKey')).toBe(apiKey);
  });
});
