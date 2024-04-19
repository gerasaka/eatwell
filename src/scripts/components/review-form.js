import { showToast } from "../utils/toast-helper";
import DetailsPageComponent from "../views/pages/details";

export default class ReviewFormComponent extends HTMLElement {
  _restaurantService = undefined;
  _restaurantId;

  constructor(restaurantService, restaurantId) {
    super();
    this._restaurantService = restaurantService;
    this._restaurantId = restaurantId;
  }

  connectedCallback() {
    this.render();
  }

  async submitReview() {
    const name = this.querySelector("#author").value;
    const review = this.querySelector("#review").value;

    if (!name || !review) {
      showToast("failed", "Field nama dan ulasan wajib diisi");
      return;
    }

    const response = await this._restaurantService.submitReview(this._restaurantId, name, review);
    if (response) this.afterSubmit(response);
  }

  /**
   * this method use to repaint element after submit review
   * @param response response api after submit review that contains customer reviews
   */
  afterSubmit(response) {
    const form = this.querySelector(".review-form");
    form.reset();

    const newReviewEl = new DetailsPageComponent(this._restaurantService).createReviewEl(
      response,
      this._restaurantId,
    );
    document.querySelector(".review-wrapper").remove();
    document.querySelector(".details-wrapper").appendChild(newReviewEl);
  }

  render() {
    this.innerHTML = `
      <form class="review-form">
        <label for="author" tabindex="0">Nama</label>
        <input type="text" id="author" name="name" class="form-field" placeholder="Masukkan nama anda" />
        <label for="review" tabindex="0">Ulasan</label>
        <textarea name="review" id="review" class="form-field" cols="30" rows="4" placeholder="Tulis ulasan anda"></textarea>
        <button id="submit-review">Kirim</button>
      </form>
    `;

    this.querySelector("#submit-review").addEventListener("click", (e) => {
      e.preventDefault();
      this.submitReview();
    });
  }
}

customElements.define("review-form", ReviewFormComponent);
