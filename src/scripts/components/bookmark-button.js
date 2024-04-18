export default class BookmarkComponent extends HTMLElement {
  idbService = undefined;
  restaurantData = undefined;
  buttonWrapper = undefined;

  constructor(idbService, wrapper, restaurant) {
    super();

    this.idbService = idbService;
    this.restaurantData = restaurant;
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
    if (await this.idbService.getRestaurant(this.restaurantData.id)) {
      this.innerHTML = this.activeBookmarkButton;
      const bookmarkButtonEl = document.querySelector("#bookmark");
      bookmarkButtonEl.addEventListener("click", async () => {
        await this.idbService.removevRestaurant(this.restaurantData.id);
        this.render();
      });
    } else {
      this.innerHTML = this.bookmarkButton;
      const bookmarkButtonEl = document.querySelector("#bookmark");
      bookmarkButtonEl.addEventListener("click", async () => {
        await this.idbService.putRestaurant(this.restaurantData);
        this.render();
      });
    }
  }
}

customElements.define("bookmark-button", BookmarkComponent);
