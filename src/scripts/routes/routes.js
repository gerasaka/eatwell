import DetailsPageComponent from "../views/pages/details";
import FavouritePageComponent from "../views/pages/favourite";
import HomePageComponent from "../views/pages/home";

const routes = {
  "/": HomePageComponent,
  "/beranda": HomePageComponent,
  "/details": DetailsPageComponent,
  "/favorit": FavouritePageComponent,
};

export default routes;
