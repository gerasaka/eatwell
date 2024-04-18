export default class BookmarkComponent extends HTMLElement {
  _idbService = undefined;
  _restaurantData = undefined;
  buttonWrapper = undefined;

  constructor(idbService, wrapper, restaurant) {
    super();

    this._idbService = idbService;
    this._restaurantData = restaurant;
    this.buttonWrapper = wrapper;
  }

  connectedCallback() {
    this.render();
  }

  get bookmarkButton() {
    return `
      <button aria-label="Simpan restoran ini" id="bookmark">
        <span>Simpan ke favorit</span> <icon-bookmark bookmark="0"></icon-bookmark>
      </button>
    `;
  }

  get activeBookmarkButton() {
    return `
      <button aria-label="Simpan restoran ini" id="bookmark">
        <span>Hapus dari favorit</span> <icon-bookmark bookmark="1"></icon-bookmark>
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
      const bookmarkButtonEl = document.querySelector("#bookmark");
      bookmarkButtonEl.addEventListener("click", async () => {
        await this._idbService.removevRestaurant(this._restaurantData.id);
        this.render();
      });
    } else {
      this.innerHTML = this.bookmarkButton;
      const bookmarkButtonEl = document.querySelector("#bookmark");
      bookmarkButtonEl.addEventListener("click", async () => {
        await this._idbService.putRestaurant(this._restaurantData);
        this.render();
      });
    }
  }
}

customElements.define("bookmark-button", BookmarkComponent);
