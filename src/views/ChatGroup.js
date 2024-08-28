import { navigateTo } from '../routes.js';
import { communicateWithOpenAI } from '../lib/openAIApi.js';
import { chatGroupComponents } from "../components/chatGroupComponents.js";
import data from "../data/dataset.js";

function getRandomMovie(movies) {
  if (movies.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
}

// Declaración de funciones en el nivel raíz
function sendMessage(messageInput, chatInteractionBox, randomMovie) {
  const userMessage = messageInput.value.trim();
  if (userMessage) {
    addMessageToChat(userMessage, 'outgoing', randomMovie, chatInteractionBox);

    messageInput.value = '';

    try {
      data.forEach(async (movie) => {
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
        addMessageToChat(`${movie.name}: ${aiResponse}`, 'incoming', movie, chatInteractionBox);
      });
    } catch (error) {
      addMessageToChat('Error al comunicarse con la IA.', 'incoming', randomMovie, chatInteractionBox);
    }
  }
}

function addMessageToChat(message, type, movie, chatInteractionBox) {
  const li = document.createElement('li');
  li.classList.add(`chat-${type}`);
  if (type === "outgoing") {
    li.innerHTML = `<p>${message}</p>`;
  } else {
    li.innerHTML = `
      <div class="message-header">
        <img src="${movie.imageUrl}" alt="${movie.imageDescription}" class="image-chatGroup"/>

      </div>
      <div class= "group-message">
      <span class="name">${movie.name}</span>
      <div class="message-content">
        <p>${message}</p>
      </div>
      </div>
    `;
  }

  chatInteractionBox.appendChild(li);

  // Desplaza automáticamente hacia el último mensaje
  chatInteractionBox.scrollTop = chatInteractionBox.scrollHeight;
}

export default function ChatGroup() {
  const randomMovie = getRandomMovie(data); // Obtiene una película aleatoria
  const rootElement = document.createElement("div");

  if (randomMovie) {
    rootElement.innerHTML = chatGroupComponents(randomMovie); // Pasa la película aleatoria

    const sendMessageButton = rootElement.querySelector("#send-message");
    const messageInput = rootElement.querySelector("textarea");
    const chatInteractionBox = rootElement.querySelector(".chat-interaction");

    // Mostrar la imagen de la película seleccionada
    const imageChat = rootElement.querySelector('.image-chat img');
    if (imageChat && randomMovie.imageUrl) {
      imageChat.src = randomMovie.imageUrl;
      imageChat.alt = randomMovie.name;
    }

    // Enviar mensaje con el botón
    if (sendMessageButton && messageInput) {
      sendMessageButton.addEventListener('click', () => sendMessage(messageInput, chatInteractionBox, randomMovie));

      // Permitir envío con "Enter"
      messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();  // Evita que se añada una nueva línea en el textarea
          sendMessage(messageInput, chatInteractionBox, randomMovie);
        }
      });
    }

    const apiKeyButton = rootElement.querySelector('.api-key-button');
    apiKeyButton.addEventListener('click', () => {
      navigateTo("/api-key");
    });

  } else {
    rootElement.innerHTML = "<p>Error: No se encontraron películas con imágenes válidas.</p>";
  }

  return rootElement;
}
