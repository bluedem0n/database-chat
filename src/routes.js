let ROUTES = {};
let ROOT;

export const setRootEl = (el) => {
  ROOT = el;
};

export const setRoutes = (routes) => {
  ROUTES = routes;
};

const renderView = (pathname, props = {}) => {
  if (!ROOT) return;  // Asegurarse de que ROOT esté definido
  ROOT.innerHTML = "";

  const view = ROUTES[pathname] || ROUTES["/error"];
  
  const viewElement = view(props);
  ROOT.appendChild(viewElement);
};

const queryStringToObject = (queryString) => {
  const params = new URLSearchParams(queryString);
  return Object.fromEntries(params);
};

export const navigateTo = (pathname, props = {}) => {
  let queryString = "";
  if (props && Object.keys(props).length) {
    queryString = Object.keys(props)
      .map((key) => `${key}=${props[key]}`)
      .join("&");
  }

  const fullPath = queryString ? `${pathname}?${queryString}` : pathname;

  window.history.pushState({}, "", fullPath);
  renderView(pathname, props);
};

export const onURLChange = () => {
  const { pathname, search } = window.location;
  const searchParams = queryStringToObject(search);
  renderView(pathname, searchParams);
};