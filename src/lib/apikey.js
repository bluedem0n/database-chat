export const getApiKey = () => {
  return localStorage.getItem("marvelApiKey");
};

export const setApiKey = (key) => {
  localStorage.setItem("marvelApiKey", key);
};
