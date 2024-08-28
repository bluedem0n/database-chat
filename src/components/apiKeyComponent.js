export const apiKeyComponent = () => {
  const apiKeyComponent = `
    <main class="body-container">
      <div class="apikey-container">
        <div class="container">
          <div class="logo">
            <img src="../assets/marvel_logo.png" alt="Marvel Logo"/>
          </div>
          <h1 class="tittle-apiKey">Marvel Movies</h1>
        </div>
        <div class="apikey-continer2">
          <p class="description">
            Enter your API key and learn more about your favorite movies.
          </p>
          <input type="text" class="inputApiKey" id="apikey" placeholder="Type here..." required/>
          <button id="buttonSafeApikey">Save</button>
          <p id="return-home">See movies</p>
        </div>
      </div>
    </main>
  `;

  return apiKeyComponent;
}
