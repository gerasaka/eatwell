import { RestaurantCardComponent, SearchBarComponent } from "../../components";
import animateCarousel from "../../utils/hero";

export default class HomePageComponent {
  constructor(restaurantService) {
    this._restaurantService = restaurantService;
  }

  createCarouselEl() {
    const wrapperElement = document.createElement("section");
    wrapperElement.id = "carousel";
    wrapperElement.innerHTML = `
      <picture>
        <source
          id="small-hero"
          media="(max-width: 600px)"
          srcset="./images/heroes/hero-image_1-small.webp"
        >
        <img
          id="carousel-item"
          src="./images/heroes/hero-image_1-large.webp" 
          alt="gambar hero"
          fetchpriority="high"
        >
      </picture>

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

  /**
   * this method use to create restaurant list element and can be used to repaint elment
   * when receive restaurants param from api response
   * @param restaurants [optional] use when repaint element
   * @returns HTML element - review element
   */
  async generateRestaurantList(restaurants) {
    const restaurantContainer = document.createElement("div");
    restaurantContainer.className = "restaurant-container";

    const restaurantList = restaurants ?? (await this._restaurantService.getRestaurantList());

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
          <source media="(max-width: 600px)" srcset="./images/illustration/empty-small.webp">
          <img src="./images/illustration/empty-large.webp" alt="ilustrasi list restoran kosong">s
        </picture>
        <p tabindex="0">Sedang terjadi masalah atau tidak ada restoran untuk ditampilkan</p>
      `;

      restaurantContainer.appendChild(emptyWrapper);
    }

    return restaurantContainer;
  }

  async render(pageWrapper) {
    const carouselEl = this.createCarouselEl();
    const restaurantListEl = this.createRestaurantListEl();
    const searchBarEl = new SearchBarComponent(this._restaurantService);

    restaurantListEl.appendChild(searchBarEl);
    restaurantListEl.appendChild(await this.generateRestaurantList());

    pageWrapper.appendChild(carouselEl);
    pageWrapper.appendChild(restaurantListEl);

    animateCarousel();
  }
}
