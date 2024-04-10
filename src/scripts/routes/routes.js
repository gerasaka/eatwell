import Details from "../views/pages/details";
import Favorite from "../views/pages/favorite";
import Home from "../views/pages/home";

const homePage = new Home();

const routes = {
  "/": homePage,
  "/beranda": homePage,
  "/details": new Details(),
  "/favorit": new Favorite(),
};

export default routes;
