import { navigateTo } from '../routes.js';


export const renderItems = (data) => {
  // Creación elemento <ul> utilizando createElement
  const ulElement = document.createElement('ul');
  ulElement.classList.add('cards');

  // Recorrer la data mediante un bucle forEach
  data.forEach(item => {
    // Crear elemento <li> para cada elemento de data
    const liElement = document.createElement('li');
    liElement.classList.add('item');
    liElement.setAttribute('itemscope', '');
    liElement.setAttribute('itemtype', 'marvelMovies');
    liElement.setAttribute('data-id', item.id);

    //Agregar contenido HTML interno dentro de <li>
    liElement.innerHTML = `
      <dl itemscope itemtype= "marvelMovies">
      <div class="movie-item">
        <img src="${item.imageUrl}" alt="${item.imageDescription}" class="movie-image"/>
        <button class="play-button" data-trailer="${item.facts.trailer}">&#9658</button>
      </div>
      <section class="texto">
        <dt>Year:</dt><dd itemprop="year">${item.facts.year}</dd>
        <dt>Name</dt><dd itemprop="name">${item.name}</dd>
        <dt>Short Description:</dt><dd itemprop="shortDescription">${item.shortDescription}</dd>
        <dt>Director:</dt><dd itemprop="director">Directed by ${item.facts.director}</dd>
        <dt>Duration:</dt><dd itemprop="duration">Duration ${item.facts.duration}</dd>
        <dt>Rating:</dt><dd itemprop="rating"><img class="rating-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="IMDb Logo" />  ${item.facts.rating}</dd>
        <div class="button-group">
          <button class="viewmore-button">View more</button>
         <button class="chat-button">
          <img src="assets/chat-icon.png" alt="Chat Icon" class="chat-icon"> Chat
        </button>

        </div>
      </section>
      </dl>
    `;

    // Agrega el evento click al botón "View more"
    const viewMoreButton = liElement.querySelector('.viewmore-button');
    viewMoreButton.addEventListener('click', () => {
      const movieId = item.id; 
      navigateTo("/about", { id: movieId });
    });

    const chatButton = liElement.querySelector('.chat-button');
    chatButton.addEventListener('click', () => {
      const movieId = item.id; 
      navigateTo("/chat", { id: movieId });
      
    });

   
    ulElement.appendChild(liElement);
  });

  // Retornar el elemento <ul> completo
  return ulElement;
};

