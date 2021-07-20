import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import ProfilePage from "./page/ProfilePage";
import MenuPage from "./page/MenuPage";
import ProductDetailPage from "./page/ProductDetailPage";
import CreatePostPage from "./page/CreatePostPage";
import LocationPage from "./page/LocationPage/index";
import ChatRoomPage from "./page/ChatRoomPage/index";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1); // exclude path matching
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

export const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

export const router = async () => {
  const routes = [
    { path: "/", view: HomePage },
    { path: "/login", view: LoginPage },
    { path: "/signup", view: SignupPage },
    { path: "/profile", view: ProfilePage },
    { path: "/menu", view: MenuPage },
    { path: "/product/:productId", view: ProductDetailPage },
    { path: "/createPost", view: CreatePostPage },
    { path: "/location", view: LocationPage },
    { path: "/chat/:productId", view: ChatRoomPage },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));
  document.querySelector("#app").innerHTML = await view.render();

  await view.after_render();
};
