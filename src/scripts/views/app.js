import routes from "../routes/routes";
import UrlParser from "../routes/url-parser";

export default class App {
  _mainContent = undefined;

  constructor() {
    this._mainContent = document.querySelector("main");
  }

  async renderPage() {
    this._mainContent.innerHTML = "";
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    await page.render(this._mainContent);
  }
}
