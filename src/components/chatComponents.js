export const chatComponents = (item) => {
  const chatComponents = `
    <header class="header-chat">
      <section class="menu-chat">
        <div class="logo">
          <img src="assets/marvel_logo.png" alt="Marvel Logo">
        </div>
        <div class="api-key-button" id="api-button-chat">
          <button>API Key</button>
        </div>
      </section>
    </header>
    <main class="chat-container-box">
      <div class="chat-container">
        <div>
          <img src="${item.imageUrl}" alt="${item.imageDescription}" class="image-chat"/>
        </div>
        <div class="chat-box">
          <div class="chat-header">
            <div>
              <img src="${item.imageUrl}" alt="${item.imageDescription}" class="img-chat1"/>
            </div>
            <div>
                <p class="chat-name">${item.name}</p>
            </div>
          </div>
          <div class="chat-interaction-box">
            <ul class="chat-interaction">
              <li class="chat-incoming">
                <img src="${item.imageUrl}" alt="${item.imageDescription}" class="img-chat2"/>
                <p class="first-message">Hi there!</p>
              </li>
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

  return chatComponents;
};
