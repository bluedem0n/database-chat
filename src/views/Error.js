const Error = () => {
  const errorEl = document.createElement("div");
  errorEl.innerHTML = `
  <p class="titleError"> Error: Page not found</p>
  <div class="Tony">
  <img src="../assets/errorTony.jpg" alt="tony startk">
  </div>
  `;

  return errorEl;
};

export default Error;
