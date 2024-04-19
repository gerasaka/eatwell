import routes from "../routes/routes";
import UrlParser from "../routes/url-parser";
import IndexDBService from "../services/indexDB";
import RestaurantService from "../services/restaurant";

export default class App {
  _mainContent = undefined;
  _restaurantService = undefined;

  constructor() {
    this._mainContent = document.querySelector("main");
    this._restaurantService = new RestaurantService();
    this._idbService = new IndexDBService();
  }

  async renderPage() {
    this._mainContent.innerHTML = "";
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = new routes[url](this._restaurantService, this._idbService);
    await page.render(this._mainContent);
  }
}
