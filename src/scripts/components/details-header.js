import { BASE_IMAGE_URL } from "../constant/config";
import BookmarkComponent from "./bookmark-button";

const noImage = require("../../public/images/no-image.png");

export default class DetailsHeaderComponent extends HTMLElement {
  constructor(data, idbService) {
    super();

    this._idbService = idbService;
    this._data = data;
  }

  connectedCallback() {
    this.render();
  }

  generateCategoriesEl() {
    const categories = this._data.categories.map(
      ({ name }) => `<span tabindex="0" class="pill-item">${name}</span>`,
    );
    return categories.join("");
  }

  createBookmarkButtonEl() {
    const wrapper = document.createElement("div");
    wrapper.className = "bookmark-wrapper";
    const bookmarkButton = new BookmarkComponent(this._idbService, wrapper, this._data);
    wrapper.appendChild(bookmarkButton);

    return wrapper;
  }

  render() {
    const wrapperElement = document.createElement("section");
    wrapperElement.className = "details-header";

    wrapperElement.innerHTML = `
      <img
        tabindex="0"
        src="${BASE_IMAGE_URL}/${this._data.pictureId}"
        alt="Gambar ${this._data.name}"
        onerror="this.onerror=null;this.src='${noImage}';this.style.objectFit = 'contain';this.style.padding = '3rem'"
      />

      <div>
        <h1 tabindex="0">${this._data.name}</h1>

        <div class="address">
          <h3 tabindex="0">${this._data.city}</h3>
          <span tabindex="0"><icon-pin></icon-pin>${this._data.address}</span>
        </div>

        <div class="rating">
          <h3 tabindex="0">Rating</h3>
          <span tabindex="0" class="rating-pill"><icon-star></icon-star> ${this._data.rating.toFixed(1)}</span>
        </div>

        <div class="categories">
          <h3 tabindex="0">Kategori</h3>
          <span class="pill-container">${this.generateCategoriesEl()}</span>
        </div>
      </div>
    `;

    this.appendChild(wrapperElement);
    this.appendChild(this.createBookmarkButtonEl());
  }
}

customElements.define("details-header", DetailsHeaderComponent);
