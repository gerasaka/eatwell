import { RestaurantCardComponent } from "../../components";

export default class FavouritePageComponent {
  constructor(_, idbService) {
    this._idbService = idbService;
  }

  createFavouriteHeaderEl() {
    return `
      <div class="favourite-header">
        <picture>
          <source media="(max-width: 600px)" srcset="./images/illustration/files-small.webp">
          <img 
            src="./images/illustration/files-large.webp" 
            alt="gambar ilustrasi file"
            loading="lazy"
          >
        </picture>
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
        <picture>
          <source media="(max-width: 600px)" srcset="./images/illustration/flying-kite-small.png">
          <img 
            src="./images/illustration/flying-kite-large.png" 
            alt="ilustrasi list restoran kosong"
            loading="lazy"
          >
        </picture>
        <p tabindex="0">Tidak ada restoran favorit, mulai simpan restoran untuk akses yang lebih mudah dan cepat</p>
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
