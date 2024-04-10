import { RestaurantCardComponent } from "../../components";
import animateCarousel from "../../components/hero";
import { LIST_RESTAURANT } from "../../constant/api-path";

export default class Home {
  createCarouselEl() {
    const wrapperElement = document.createElement("section");
    wrapperElement.id = "carousel";
    wrapperElement.innerHTML = `
      <img
        id="carousel-item"
        src="../images/heroes/hero-image_1.jpg"
        alt="gambar hero"
        tabindex="0"
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

    let restaurantList = [];

    await fetch(LIST_RESTAURANT)
      .then((res) => res.json())
      .then((data) => (restaurantList = data.restaurants))
      // eslint-disable-next-line no-console
      .catch((err) => console.log("error occurs", err));

    if (restaurantList.length) {
      restaurantList.forEach((restaurant) => {
        const restaurantItem = new RestaurantCardComponent(restaurant);
        restaurantContainer.appendChild(restaurantItem);
      });
    } else {
      const emptyWrapper = document.createElement("div");
      emptyWrapper.className = "empty-wrapper";
      emptyWrapper.innerHTML = `
        <img src="../images/illustration/blank.png" alt="ilustrasi list restoran kosong" />
        <p>Sedang terjadi masalah atau tidak ada restoran untuk ditampilkan</p>
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
  }

  async afterRender() {
    animateCarousel();
  }
}
