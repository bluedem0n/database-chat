import { apiKeyComponent } from "../components/apiKeyComponent.js";

export default function ApikeyView() {

  const rootElement = document.createElement("div");
  rootElement.innerHTML = apiKeyComponent();

  setTimeout(() => {
    const saveButton = rootElement.querySelector('#buttonSafeApikey');
    const apiKeyInput = rootElement.querySelector('#apikey');
    const returnHome = rootElement.querySelector('#return-home');

    // Guardar la API key en localStorage
    saveButton.addEventListener('click', () => {
      const apiKey = apiKeyInput.value;
      if (apiKey) {
        localStorage.setItem('marvelApiKey', apiKey);
        alert('API key saved successfully!');
      } else {
        alert('Please enter a valid API key.');
      }
    });


    returnHome.addEventListener('click', () => {
      window.location.href = '/'; 
    });

  }, 0);
  return rootElement;
}
