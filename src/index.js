import { setRootEl, setRoutes, onURLChange } from './routes.js';
import Home  from './views/HomeView.js';
import Details  from './views/DetailView.js';
import ApikeyView from './views/ApikeyView.js';
import Error from "./views/Error.js";
import ChatView from "./views/ChatView.js";
import ChatGroup from "./views/ChatGroup.js";

const routes = {
  '/': Home,
  '/about': Details,
  '/api-key': ApikeyView,
  '/error': Error,
  '/chat': ChatView,
  '/chat-group': ChatGroup,
};

// Assign the routes
setRoutes(routes);


window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  setRootEl(root);
  onURLChange();
});

window.addEventListener("popstate", () => {
  onURLChange();
});


// window.addEventListener('load', onURLChange());

