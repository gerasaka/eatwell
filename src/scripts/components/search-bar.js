import { showToast } from "../utils/toast-helper";
import HomePageComponent from "../views/pages/home";

export default class SearchBarComponent extends HTMLElement {
  constructor(restaurantService) {
    super();
    this._restaurantService = restaurantService;
  }

  connectedCallback() {
    this.render();
  }

  async searchRestaurant() {
    const query = this.querySelector("#query").value;

    if (!query) {
      showToast("failed", "Field nama dan ulasan wajib diisi");
      return;
    }

    const response = await this._restaurantService.searchRestaurant(query);
    if (response) this.afterSearch(response);
  }

  /**
   * this method use to repaint restaurant list element
   * @param response response restaurant list api from search restaurant
   */
  afterSearch(response) {
    const form = this.querySelector(".search-form");
    form.reset();

    const newRestaurantListEl = new HomePageComponent(
      this._restaurantService,
    ).generateRestaurantList(response);
    document.querySelector(".restaurant-container").remove();
    document.querySelector("#main").appendChild(newRestaurantListEl);
  }

  render() {
    this.innerHTML = `
      <form class="search-form">
        <input aria-label="field input cari restoran" type="text" id="query" name="query" class="form-field" placeholder="Masukkan nama, kategori, atau menu" />
        <button id="submit-search"><icon-search></icon-search> Cari</button>
      </form>
    `;

    this.querySelector("#submit-search").addEventListener("click", (e) => {
      e.preventDefault();
      this.searchRestaurant();
    });
  }
}

customElements.define("search-bar", SearchBarComponent);
