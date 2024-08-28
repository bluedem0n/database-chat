
import { navigateTo } from '../routes.js';
import data from "../data/dataset.js";
import { detailsComponent } from "../components/detailsComponent.js";
import { getMovieById } from "../lib/dataFunctions.js"

export default function About() {
  const rootElement = document.createElement("div");
  const movieId = getQueryParam("id")
  const movie = getMovieById(data, movieId)
  rootElement.innerHTML = detailsComponent(movie);

  const trailerPlay = rootElement.querySelector('.trailer-play');
  trailerPlay.addEventListener('click', event => {
    const trailerUrl = event.target.getAttribute('data-trailer');
    showTrailerModal(trailerUrl);
  });

  // background image
  const backgroundImageUrl = movie.front
  const backgrounHeader = rootElement.querySelector('.header-details');
  // Verifica si el elemento existe
  if (backgrounHeader) {
    // Agrega la imagen de fondo utilizando la URL dinámica
    backgrounHeader.style.backgroundImage = `linear-gradient(to bottom,rgba(5, 7, 12, 0.8), rgba(5, 7, 12, 0.4)),url(${backgroundImageUrl})`;
  }

  function showTrailerModal(trailerUrl) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-button">&times;</span>
        <iframe class="trailer-video" src="${trailerUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    `;
    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  const apiKeyButton = rootElement.querySelector('.api-key-button');
  apiKeyButton.addEventListener('click', () => {
    navigateTo("/api-key");
  });

  const chatButton = rootElement.querySelector('.chat-button');
  chatButton.addEventListener('click', () => {
    navigateTo("/chat", { id: movieId });
  });


  // Función para obtener el parámetro de la URL
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  return rootElement;
}

