export const chatGroupComponents = (item) => {
  const groupchatComponents = `
  <header class="header-chat">
  <section class="menu">
    <div class="logo">
      <img src="assets/marvel_logo.png" alt="Marvel Logo">
    </div>
    <div class="api-key-button">
      <button class= "api-group">API Key</button>
    </div>
  </section>
</header>
    <main class="chat-container-box">
      <div class="chat-container">
        <div class="image-chat">
          <img src="${item.imageUrl}" alt="${item.imageDescription}" class="image-group-chat-poster"/>
        </div>
        <div class="chat-box">
          <div class="chat-group-header">
            <div>
              <ul>
                <p class="name-chat-group"> Marvel movies </p>
              </ul>
            </div>
          </div>
          <div class="chat-interaction-box">

            <ul class="chat-interaction">
            <li class="chat-incoming">
            <img src="${item.imageUrl}" alt="${item.imageDescription}" class="image-chat-group-tittle"/>
            <p>Hi there! Ask us some interesting!</p></li>
              <li class="chat-incoming"></li>
              <li class="chat-outgoing"></li>
            </ul>
          </div>
          <div class="chat-input">
            <textarea placeholder="Enter a message..."></textarea>
            <button type="submit" id="send-message">
              <img src="../assets/send.png" alt="send">
            </button>
          </div>
        </div>
      </div>
    </main>
  `;

  return groupchatComponents;
}
