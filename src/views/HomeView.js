import { navigateTo } from '../routes.js';
import {
  filterDataYear,
  filterDataRating,
  sortData,
  calculateAverageRating,
  calculateAwardsReceived,
  calculateTotalAudience,
  searchMovies,
} from "../lib/dataFunctions.js";
import data from "../data/dataset.js";
import { homeComponent } from "../components/homeComponent.js";
import { renderItems } from "../components/cardComponent.js";

export default function Home() {
  const rootElement = document.createElement("div");
  rootElement.innerHTML = homeComponent();

  const cardsElement = rootElement.querySelector('#home');

  // Carga de elementos ul
  const items = renderItems(data);
  cardsElement.appendChild(items);

  // Llamar las funciones con ids
  const filterYear = rootElement.querySelector("#filter-year");
  const filterRating = rootElement.querySelector("#filter-rating");
  const sort = rootElement.querySelector("#sort");

  // Promedios
  const average = rootElement.querySelector("#average-rating");
  const awards = rootElement.querySelector("#awards-received");
  const audience = rootElement.querySelector("#total-audience");

  // Botones
  const buttonClear = rootElement.querySelector("#button-clear");
  const searchInput = rootElement.querySelector(".search-bar input");
  const groupChat = rootElement.querySelector(".group-chat-button");


  // Filter
  filterYear.addEventListener('change', applyFilters);
  filterRating.addEventListener('change', applyFilters);
  sort.addEventListener('change', applyFilters);

  buttonClear.addEventListener('click', clearFilters);
  sort.value = 'asc';

  groupChat.addEventListener('click', () => {
    navigateTo("/chat-group");
  });

  const apiKeyButton = rootElement.querySelector('.api-key-button');
  apiKeyButton.addEventListener('click', () => {
    navigateTo("/api-key");
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredData = searchMovies(data, query);
    cardsElement.innerHTML = '';
    const ulElement = renderItems(filteredData);
    cardsElement.appendChild(ulElement);
  });

  rootElement.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', event => {
      const trailerUrl = event.target.getAttribute('data-trailer');
      showTrailerModal(trailerUrl);
    });
  });

  function applyFilters() {
    // Obtener valores usando querySelector
    const filterYearValue = rootElement.querySelector('#filter-year').value;
    const filterRatingValue = rootElement.querySelector('#filter-rating').value;
    const sortValue = rootElement.querySelector('#sort').value;

    // Aplicar filtros y ordenar los datos
    let filteredData = filterDataYear(data, filterYearValue);
    filteredData = filterDataRating(filteredData, filterRatingValue);
    const sortedData = sortData(filteredData, sortValue);

    // Limpiar la sección raíz y renderizar los elementos ordenados
    cardsElement.innerHTML = '';
    const ulElement = renderItems(sortedData);
    cardsElement.appendChild(ulElement);

    // Vuelve a agregar los controladores de eventos de los botones después de renderizar los elementos
    ulElement.querySelectorAll('.play-button').forEach(button => {
      button.addEventListener('click', event => {
        const trailerUrl = event.target.getAttribute('data-trailer');
        showTrailerModal(trailerUrl);
      });
    });
  }

  function clearFilters() {
    rootElement.querySelector('#filter-year').value = 'all';
    rootElement.querySelector('#filter-rating').value = 'all';
    rootElement.querySelector('#sort').value = 'asc';

    applyFilters(); // Aplicar filtros después de limpiar
  }

  function initStatistics() {
    // Calcular el rating promedio
    const averageRating = calculateAverageRating(data);
    // Calcular el total de premios recibidos
    const totalAwardsReceived = calculateAwardsReceived(data);
    // Calcular el total de audiencia
    const totalAudience = calculateTotalAudience(data);

    // Actualizar el DOM con el rating promedio, total de premios y total de audiencia
    average.textContent = averageRating;
    awards.textContent = totalAwardsReceived;
    audience.textContent = totalAudience;
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

  function showMenu() {
    const toggleButton = rootElement.querySelector('.filter-menu-toggle');
    const filterMenu = rootElement.querySelector('.filter-menu');

    toggleButton.addEventListener('click', function() {
      filterMenu.classList.toggle('show');
    });
  }


  showMenu();
  initStatistics();

  return rootElement;
}
