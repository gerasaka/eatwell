import DetailsHeaderComponent from "../../components/details-header";
import ReviewCardComponent from "../../components/review-card";
import ReviewFormComponent from "../../components/review-form";
import UrlParser from "../../routes/url-parser";

export default class DetailsPageComponent {
  _restaurantDetails = undefined;

  constructor(restaurantService, idbService) {
    this._restaurantService = restaurantService;
    this._idbService = idbService;
  }

  async loadRestaurantDetails() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this._restaurantDetails = await this._restaurantService.getRestaurantDetails(url.id);
  }

  createMenuEl() {
    const wrapperElement = document.createElement("section");
    wrapperElement.className = "menu-wrapper";
    wrapperElement.innerHTML = `<h2 tabindex="0">Menu</h2>`;

    const { foods, drinks } = this.generateMenuEl();

    const menuContainer = document.createElement("div");
    menuContainer.className = "menu-container";
    menuContainer.innerHTML = `
      <div class="menu-display">
        <p tabindex="0">Makanan</p>
        <div>
          <picture>
            <source media="(max-width: 600px)" srcset="./images/illustration/food-small.webp">
            <img 
              src="./images/illustration/food-large.webp" 
              alt="ilustrasi makanan"
              loading="lazy"
            >
          </picture>
          <ul>${foods}</ul>
        </div>
      </div>
      <div class="menu-display">
        <p tabindex="0">Minuman</p>
        <div>
          <picture>
            <source media="(max-width: 600px)" srcset="./images/illustration/drink-small.webp">
            <img 
              src="./images/illustration/drink-large.webp" 
              alt="ilustrasi minuman"
              loading="lazy"
            >
          </picture>
          <ul>${drinks}</ul>
        </div>
      </div>
    `;

    wrapperElement.appendChild(menuContainer);
    return wrapperElement;
  }

  generateMenuEl() {
    const foods = this._restaurantDetails.menus.foods.map(
      ({ name }) => `<li tabindex="0">${name}</li>`,
    );
    const drinks = this._restaurantDetails.menus.drinks.map(
      ({ name }) => `<li tabindex="0">${name}</li>`,
    );

    return { foods: foods.join(""), drinks: drinks.join("") };
  }

  /**
   * this method use to create review element and can be used to repaint review elment
   * when receive customerReviews and id from api response
   * @param customerReviews [optional] use when repaint element
   * @param id [optional] use when repaint element
   * @returns HTML element - review element
   */
  createReviewEl(customerReviews, id) {
    const wrapperElement = document.createElement("section");
    wrapperElement.className = "review-wrapper";
    wrapperElement.innerHTML = `<h2 tabindex="0">Ulasan Pelanggan</h2>`;

    const reviewContainer = document.createElement("span");
    reviewContainer.className = "review-container";
    const reviews = this.generateReviews(
      customerReviews ?? this._restaurantDetails.customerReviews,
    );
    reviews.forEach((reviewEl) => reviewContainer.appendChild(reviewEl));

    wrapperElement.appendChild(
      new ReviewFormComponent(this._restaurantService, id ?? this._restaurantDetails.id),
    );
    wrapperElement.appendChild(reviewContainer);
    return wrapperElement;
  }

  generateReviews(customerReviews) {
    const reviewsEl = customerReviews.map((review) => {
      return new ReviewCardComponent(review);
    });

    return reviewsEl;
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
    descEl.tabIndex = "0";
    descEl.innerText = this._restaurantDetails.description;

    const detailsHeaderEl = new DetailsHeaderComponent(this._restaurantDetails, this._idbService);
    const menuEl = this.createMenuEl();
    const reviewEl = this.createReviewEl();

    wrapperElement.appendChild(detailsHeaderEl);
    wrapperElement.appendChild(descEl);
    wrapperElement.appendChild(menuEl);
    wrapperElement.appendChild(reviewEl);

    return wrapperElement;
  }

  errorDetailsHandlerEl() {
    const errorWrapper = document.createElement("div");
    errorWrapper.className = "error-wrapper";

    errorWrapper.innerHTML = `
      <h1 tabindex="0">Hmmm... Terjadi kesalahan</h1>
      <picture>
        <source media="(max-width: 600px)" srcset="./images/illustration/bug-small.webp">
        <img 
          src="./images/illustration/bug-large.webp" 
          alt="gambar ilustrasi bug atau error"
          loading="lazy"
        >
      </picture>
      <p tabindex="0">Gagal memuat halaman details, periksa koneksi anda atau coba beberapa saat lagi</p>
    `;

    return errorWrapper;
  }

  async render(pageWrapper) {
    await this.loadRestaurantDetails();

    if (this._restaurantDetails) {
      pageWrapper.appendChild(this.constructDetailsPage());
    } else {
      pageWrapper.appendChild(this.errorDetailsHandlerEl());
    }
  }
}
