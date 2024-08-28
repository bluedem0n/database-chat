export const detailsComponent = (item) => {

  const element = `
    <header class="header-details">
        <section class="menu">
      <div class="logo">
        <img src="assets/marvel_logo.png" alt="Marvel Logo">
      </div>
      <div class="api-key-button">
        <button>API Key</button>
      </div>
    </section>
    </header>
    <div class="details-container">
    <div class="movie-image-box">
     <img src="${item.imageUrl}" alt="${item.imageDescription}" class="movie-image"/>
    </div>
      <div class="details">
        <ul class="details-box">
          <li class="year">${item.facts.year}</li>
          <li class="name">${item.name}</li>
          <li class="rating"><img class="rating-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="IMDb Logo" />  ${item.facts.rating}</li>
          <li class="description">${item.description}</li>
          <li class="director">Director:  ${item.facts.director}</li>
          <li class="duration">Duration:  ${item.facts.duration}</li>
          <li class="awards">Awards:  ${item.extraInfo.awards}</li>
          <li class="audience">Audience:  ${item.extraInfo.audience}</li>
        </ul>
      </div>
      <div class="buttons-and-actors">
      <div class="buttons-top">
        <button class="chat-button">
            <img src="assets/chat-icon.png" alt="Chat Icon" class="chat-icon"> Chat
          </button>
          <button class="trailer-play" data-trailer="${item.facts.trailer}
        ">Watch trailer</button>
      </div>
        ${generateCharactersSection(item.characters)}
      </div>
    </div>
      `

  function generateCharactersSection(characters) {
    let charactersHTML = `<section id="characters"><h2>Main actors</h2>`;

    for (let i = 0; i < characters.length; i++) {
      charactersHTML += `
      <div class="character">
        <img src="${characters[i].imageUrl}" alt="${characters[i].actor}" class="character-image"/>
        <div class="character-info">
            <p class="actor-name">${characters[i].actor}</p>
            <p class="character-name">${characters[i].name}</p>
        </div>
      </div>`;
    }

    charactersHTML += `</section>`;
    return charactersHTML;
  }

  return element;
}

