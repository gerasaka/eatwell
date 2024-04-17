import DetailsHeaderComponent from "../../components/details-header";
import ReviewCardComponent from "../../components/review-card";
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

  createMenuEl() {
    const wrapperElement = document.createElement("section");
    wrapperElement.className = "menu-wrapper";
    wrapperElement.innerHTML = `<h2>Menu</h2>`;

    const { foods, drinks } = this.generateMenuEl();

    const menuContainer = document.createElement("div");
    menuContainer.className = "menu-container";
    menuContainer.innerHTML = `
      <div class="menu-display">
        <p>Makanan</p>
        <div>
          <img src="images/illustration/food.png" alt="ilustrasi makanan" />
          <ul>${foods}</ul>
        </div>
      </div>
      <div class="menu-display">
        <p>Minuman</p>
        <div>
          <img src="images/illustration/drink.png" alt="ilustrasi minuman" />
          <ul>${drinks}</ul>
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
    wrapperElement.className = "review-wrapper";
    wrapperElement.innerHTML = `<h2>Ulasan</h2>`;

    const reviewContainer = document.createElement("span");
    reviewContainer.className = "review-container";
    const reviews = this.generateReviews();
    reviews.forEach((reviewEl) => reviewContainer.appendChild(reviewEl));

    wrapperElement.appendChild(reviewContainer);
    return wrapperElement;
  }

  generateReviews() {
    const reviews = this._restaurantDetails.customerReviews.map((review) => {
      return new ReviewCardComponent(review);
    });

    return reviews;
  }

  /**
   * construct details page layout
   * @returns details page
   */
  constructDetailsPage() {
    const wrapperElement = document.createElement("div");
    wrapperElement.className = "details-wrapper";

    const descEl = document.createElement("p");
    descEl.className = "description";
    descEl.innerText = this._restaurantDetails.description;

    const detailsHeaderEl = new DetailsHeaderComponent(this._restaurantDetails);
    const menuEl = this.createMenuEl();
    const reviewEl = this.createReviewEl();

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
