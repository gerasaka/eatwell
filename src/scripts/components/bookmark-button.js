import { showToast } from "../utils/toast-helper";

export default class BookmarkComponent extends HTMLElement {
  constructor(idbService, restaurant) {
    super();

    this._idbService = idbService;
    this._restaurantData = restaurant;
  }

  async connectedCallback() {
    await this.render();
  }

  get bookmarkButton() {
    return `
      <button aria-label="Simpan restoran ini" id="bookmark">
        <icon-bookmark size="20" bookmark="0"></icon-bookmark>
      </button>
    `;
  }

  get activeBookmarkButton() {
    return `
      <button aria-label="Hapus restoran dari favorit" id="bookmark">
        <icon-bookmark size="20" bookmark="1"></icon-bookmark>
      </button>
    `;
  }

  async render() {
    /**
     * check if restaurant exist in db then render active bookmark button
     * else render bookmark button
     */
    if (await this._idbService.getRestaurant(this._restaurantData.id)) {
      this.innerHTML = this.activeBookmarkButton;
    } else {
      this.innerHTML = this.bookmarkButton;
    }

    this.attachEventListeners();
  }

  attachEventListeners() {
    const bookmarkButtonEl = this.querySelector("#bookmark");

    bookmarkButtonEl.addEventListener("click", async () => {
      if (await this._idbService.getRestaurant(this._restaurantData.id)) {
        await this._idbService.removevRestaurant(this._restaurantData.id);
        showToast("success", "Restoran dihapus dari daftar favorit");
      } else {
        await this._idbService.putRestaurant(this._restaurantData);
        showToast("success", "Restoran ditambahkan ke daftar favorit");
      }

      this.render();
    });
  }
}

customElements.define("bookmark-button", BookmarkComponent);
