import routes from "../routes/routes";
import UrlParser from "../routes/url-parser";
import { RestaurantService } from "../services/restaurant";

export default class App {
  _mainContent = undefined;
  _restaurantService = undefined;

  constructor() {
    this._mainContent = document.querySelector("main");
    this._restaurantService = new RestaurantService();
  }

  async renderPage() {
    this._mainContent.innerHTML = "";
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = new routes[url](this._restaurantService);
    await page.render(this._mainContent);
  }
}
