import { RestaurantCardComponent } from "../../components";
import IndexDBService from "../../services/indexDB";

export default class FavouritePageComponent {
  _idbService = undefined;

  constructor() {
    this._idbService = new IndexDBService();
  }

  createFavouriteHeaderEl() {
    return `
      <div class="favourite-header">
        <img src="images/illustration/files.png" alt="gambar ilustrasi file">
        <h1 tabindex="0">Daftar Restoran Favorit</h1>
      </div>
    `;
  }

  createRestaurantListEl() {
    const wrapperElement = document.createElement("section");
    wrapperElement.className = "list-wrapper";

    return wrapperElement;
  }

  async generateRestaurantList() {
    const restaurantContainer = document.createElement("div");
    restaurantContainer.className = "restaurant-container";

    const restaurantList = await this._idbService.getAllBookmark();

    if (restaurantList.length) {
      restaurantList.forEach((restaurant) => {
        const restaurantItem = new RestaurantCardComponent(restaurant);
        restaurantContainer.appendChild(restaurantItem);
      });
    } else {
      const emptyWrapper = document.createElement("div");
      emptyWrapper.className = "empty-wrapper";
      emptyWrapper.innerHTML = `
        <img src="../images/illustration/flying-kite.png" alt="ilustrasi list restoran kosong" />
        <p>Tidak ada restoran favorit, mulai simpan restoran untuk akses yang lebih mudah dan cepat</p>
      `;

      restaurantContainer.appendChild(emptyWrapper);
    }

    return restaurantContainer;
  }

  async render(pageWrapper) {
    const restaurantListEl = this.createRestaurantListEl();
    restaurantListEl.appendChild(await this.generateRestaurantList());
    pageWrapper.innerHTML = this.createFavouriteHeaderEl();
    pageWrapper.appendChild(restaurantListEl);
  }
}
