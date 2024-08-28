export const homeComponent = () => {
  const infoHome = `
  <header>
    <section class="menu">
    <div class="logo">
      <img src="assets/marvel_logo.png" alt="Marvel Logo">
    </div>
    <div class="search-bar">
      <img src="assets/search_icon.png" alt="Search Icon" class="search-icon">
      <input type="text" placeholder="Find your favorite movie">
    </div>
    <div class="api-key-button">
      <button>API Key</button>
    </div>
    </section>
    <h1>The Wonderful World of Marvel</h1>
    <h2>Your guide to the incredible Marvel Cinematic Universe, here you'll find detailed information about each movie</h2>
    <ul class="stats">
      <li class="stat-item">
        <div id="average-rating">0.0</div>
        <div>Average rating</div>
      </li>
      <li class="stat-item">
        <div id="awards-received">0</div>
        <div>Awards received</div>
      </li>
      <li class="stat-item">
        <div id="total-audience">0</div>
       <div>Total audience</div>
      </li>
     </ul>
</header>
<main class="filter-bar">
  <section>
    <p class="featureMovie">Feature movie</p>
  </section>
  <section>
    <button class="filter-menu-toggle">
      <img class="img-menu" src="assets/menu.svg">
    </button>
    <div class="filter-menu">
      <div class="filter-item">
        <div class="filter-header">
          <img src="assets/filter.png" alt="Year Icon" class="filter-icon">
          <div class="filter-label">Year</div>
        </div>
        <select id="filter-year" data-testid="filter-year" name="filter-year">
          <option class="options" value="all">All</option>
          <option class="options" value="2005-2010">2005-2010</option>
          <option class="options" value="2010-2015">2010-2015</option>
          <option class="options" value="2015-2020">2015-2020</option>
          <option class="options" value="2020-2023">2020-2023</option>
        </select>
      </div>
      <div class="filter-item">
        <div class="filter-header">
          <img src="assets/star.png" alt="Rating Icon" class="filter-icon">
          <div class="filter-label">Rating</div>
        </div>
        <select id="filter-rating" data-testid="filter-rating" name="filter-rating">
          <option class="options" value="all">All</option>
          <option class="options" value="1-4">1-4</option>
          <option class="options" value="4-7">4-7</option>
          <option class="options" value="7-10">7-10</option>
        </select>
      </div>
      <div class="filter-item">
        <div class="filter-header">
          <img src="assets/sort.png" alt="Sort Icon" class="filter-icon">
          <div class="filter-label">Sort by</div>
        </div>
        <select id="sort" data-testid="select-sort" name="orderOptions">
          <option class="options" value="desc">Latest</option>
          <option class="options" value="asc">Oldest</option>
        </select>
      </div>
      <button data-test id="button-clear">Clean</button>
    </div>
  </section>
</main>

<button class="group-chat-button"> Group Chat </button>

<section id="home"></section>
  `;

  return infoHome;
}
