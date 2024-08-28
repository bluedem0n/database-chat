import { navigateTo } from '../routes.js';
import { communicateWithOpenAI } from '../lib/openAIApi.js';
import data from "../data/dataset.js";
import { chatComponents } from "../components/chatComponents.js";
import { getMovieById } from "../lib/dataFunctions.js";

export default function ChatView() {
  const rootElement = document.createElement("div");
  const movieId = getQueryParam("id");
  const movie = getMovieById(data, movieId);
  rootElement.innerHTML = chatComponents(movie);

  const sendMessageButton = rootElement.querySelector("#send-message");
  const messageInput = rootElement.querySelector("textarea");
  const chatInteractionBox = rootElement.querySelector(".chat-interaction");

  if (sendMessageButton && messageInput) {
    sendMessageButton.addEventListener('click', async () => {
      const userMessage = messageInput.value.trim();
      if (userMessage) {
        // Mostrar mensaje del usuario en el chat
        addMessageToChat(userMessage, 'outgoing');

        // Limpiar el campo de entrada
        messageInput.value = '';

        try {
          const messages = [
            {
              role: 'system',
              content: `You are the movie "${movie.name}". Here is some information: ${movie.description}. Please respond as if you are the movie, and keep your responses brief, no more than 50 words.`,
            },
            {
              role: 'user',
              content: userMessage,
            },
          ];

          const aiResponse = await communicateWithOpenAI(messages);
          addMessageToChat(aiResponse, 'incoming');
        } catch (error) {
          addMessageToChat('Error al comunicarse con la IA.', 'incoming');
        }
      }
    });

    // Detectar la tecla Enter en el textarea
    messageInput.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter' && !event.shiftKey) { // Enter sin Shift
        event.preventDefault(); // Evitar el salto de línea
        await handleSendMessage();
      }
    });
  }

  async function handleSendMessage() {
    const userMessage = messageInput.value.trim();
    if (userMessage) {
      // Mostrar mensaje del usuario en el chat
      addMessageToChat(userMessage, 'outgoing');

      // Limpiar el campo de entrada
      messageInput.value = '';

      try {
        const messages = [
          {
            role: 'system',
            content: `You are a character or narrator from the movie "${movie.name}". Here is some information: ${movie.description}. Please respond as if you are part of this movie, and keep your responses brief, no more than 50 words.`,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ];

        const aiResponse = await communicateWithOpenAI(messages);
        addMessageToChat(aiResponse, 'incoming');
      } catch (error) {
        addMessageToChat('Error al comunicarse con la IA.', 'incoming');
      }
    }
  }

  function addMessageToChat(message, type) {
    const li = document.createElement('li');
    li.classList.add(`chat-${type}`);
    
    // Añadir imagen solo para mensajes entrantes
    if (type === 'incoming') {
      li.innerHTML = `
        <img src="${movie.imageUrl}" alt="${movie.imageDescription}" class="img-chat2"/>
        <p>${message}</p>`;
    } else {
      li.innerHTML = `
        <p>${message}</p>`;
    }
  
    chatInteractionBox.appendChild(li);
  
    // Desplazar la vista hacia el último mensaje
    chatInteractionBox.scrollTop = chatInteractionBox.scrollHeight;
  }
  

  // Función para obtener el parámetro de la URL
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // Navegar a la página para ingresar la API key
  const apiKeyButton = rootElement.querySelector('.api-key-button');
  apiKeyButton.addEventListener('click', () => {
    navigateTo("/api-key");
  });

  return rootElement;
}
