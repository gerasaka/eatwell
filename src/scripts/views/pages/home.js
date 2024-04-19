import { RestaurantCardComponent } from "../../components";
import animateCarousel from "../../utils/hero";

export default class HomePageComponent {
  _restaurantService = undefined;

  constructor(restaurantService) {
    this._restaurantService = restaurantService;
  }

  createCarouselEl() {
    const wrapperElement = document.createElement("section");
    wrapperElement.id = "carousel";
    wrapperElement.innerHTML = `
      <img
        id="carousel-item"
        src="../images/heroes/hero-image_1.jpg"
        alt="gambar hero"
      />

      <icon-chevron-down class="scroll-down"></icon-chevron-down>

      <!-- image mask -->
      <div></div>
    `;

    return wrapperElement;
  }

  createRestaurantListEl() {
    const wrapperElement = document.createElement("section");
    wrapperElement.className = "list-wrapper";
    wrapperElement.innerHTML = `<h1 tabindex="0">Temukan Restoran</h1>`;

    return wrapperElement;
  }

  async generateRestaurantList() {
    const restaurantContainer = document.createElement("div");
    restaurantContainer.className = "restaurant-container";

    const restaurantList = await this._restaurantService.getRestaurantList();

    if (restaurantList.length) {
      restaurantList.forEach((restaurant) => {
        const restaurantItem = new RestaurantCardComponent(restaurant);
        restaurantContainer.appendChild(restaurantItem);
      });
    } else {
      const emptyWrapper = document.createElement("div");
      emptyWrapper.className = "empty-wrapper";
      emptyWrapper.innerHTML = `
        <img src="../images/illustration/empty.png" alt="ilustrasi list restoran kosong" />
        <p tabindex="0">Sedang terjadi masalah atau tidak ada restoran untuk ditampilkan</p>
      `;

      restaurantContainer.appendChild(emptyWrapper);
    }

    return restaurantContainer;
  }

  async render(pageWrapper) {
    const carouselEl = this.createCarouselEl();
    const restaurantListEl = this.createRestaurantListEl();
    restaurantListEl.appendChild(await this.generateRestaurantList());

    pageWrapper.appendChild(carouselEl);
    pageWrapper.appendChild(restaurantListEl);

    animateCarousel();
  }
}
