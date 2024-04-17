import { BASE_IMAGE_URL } from "../../constant/config";
import UrlParser from "../../routes/url-parser";

export default class DetailsPageComponent {
  _restaurantService = undefined;
  _restaurantDetails = undefined;

  constructor(restaurantService) {
    this._restaurantService = restaurantService;
  }

  async loadRestaurantDetails() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this._restaurantDetails = await this._restaurantService.getRestaurantDetails(url.id);
  }

  createDetailsHeaderEl() {
    const wrapperElement = document.createElement("section");
    wrapperElement.className = "details-header";

    wrapperElement.innerHTML = `
      <h1>${this._restaurantDetails.name}</h1>

      <div class="address">
        <h4>${this._restaurantDetails.city}</h4>
        <span><icon-pin></icon-pin> Jln. Pandeglang no 19</span>
      </div>

      <div class="rating">
        <h3>Rating</h3>
        <span><icon-star></icon-star> ${this._restaurantDetails.rating.toFixed(1)}</span>
      </div>

      <div class="categories">
        <h3>Kategori</h3>
        ${this.generateCategoriesEl()}
      </div>
    `;

    return wrapperElement;
  }

  generateCategoriesEl() {
    const categories = this._restaurantDetails.categories.map(
      ({ name }) => `<span class="pill-item">${name}</span>`,
    );

    return categories.join("");
  }

  createMenuEl() {
    const wrapperElement = document.createElement("section");
    wrapperElement.innerHTML = `<h2>Menu</h2>`;

    const menuContainer = document.createElement("div");
    menuContainer.className = "menu-container";
    menuContainer.innerHTML = `
      <div>
        <p>Makanan</p>
        <div class="menu-display">
          <img src="images/illustration/food.png" alt="ilustrasi makanan" />
          <ul>
            ${this.generateMenuEl.foods}
          </ul>
        </div>
      </div>
      <div>
        <p>Minuman</p>
        <div class="menu-display">
          <img src="images/illustration/drink.png" alt="ilustrasi minuman" />
          <ul>
            ${this.generateMenuEl.drinks}
          </ul>
        </div>
      </div>
    `;

    wrapperElement.appendChild(menuContainer);
    return wrapperElement;
  }

  generateMenuEl() {
    const foods = this._restaurantDetails.menus.foods.map(({ name }) => `<li>${name}</li>`);
    const drinks = this._restaurantDetails.menus.drinks.map(({ name }) => `<li>${name}</li>`);

    return { foods: foods.join(""), drinks: drinks.join("") };
  }

  createReviewEl() {
    const wrapperElement = document.createElement("section");
    wrapperElement.innerHTML = `
      <h2>Ulasan</h2>
      ${this.generateReviews()}
    `;

    return wrapperElement;
  }

  generateReviews() {
    const reviews = this._restaurantDetails.customerReviews.map((review) => {
      return `
        <div class="review-item">
          <h3>${review.name}</h3>
          <p>${review.date}</p>
          <p>${review.review}</p>
        </div>
      `;
    });

    return reviews.join("");
  }

  constructDetailsPage() {
    const wrapperElement = document.createElement("div");
    wrapperElement.className = "details-wrapper";

    const restaurantImgEl = new Image();
    restaurantImgEl.src = BASE_IMAGE_URL + `/${this._restaurantDetails.pictureId}`;
    restaurantImgEl.alt = `Gambar ${this._restaurantDetails.name}`;

    const descEl = document.createElement("p");
    descEl.className = "description";
    descEl.innerText = this._restaurantDetails.description;

    const detailsHeaderEl = this.createDetailsHeaderEl();
    const menuEl = this.createMenuEl();
    const reviewEl = this.createReviewEl();

    wrapperElement.appendChild(restaurantImgEl);
    wrapperElement.appendChild(detailsHeaderEl);
    wrapperElement.appendChild(descEl);
    wrapperElement.appendChild(menuEl);
    wrapperElement.appendChild(reviewEl);

    return wrapperElement;
  }

  async render(pageWrapper) {
    await this.loadRestaurantDetails();
    pageWrapper.appendChild(this.constructDetailsPage());
  }
}
