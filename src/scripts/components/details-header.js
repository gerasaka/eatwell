import { BASE_IMAGE_URL } from "../constant/config";
import BookmarkComponent from "./bookmark-button";

const noImage = require("../../public/images/no-image.png");

export default class DetailsHeaderComponent extends HTMLElement {
  idbService = undefined;
  data = undefined;

  constructor(data, idbService) {
    super();

    this.idbService = idbService;
    this.data = data;
  }

  connectedCallback() {
    this.render();
  }

  generateCategoriesEl() {
    const categories = this.data.categories.map(
      ({ name }) => `<span class="pill-item">${name}</span>`,
    );
    return categories.join("");
  }

  createBookmarkButtonEl() {
    const wrapper = document.createElement("div");
    wrapper.className = "bookmark-wrapper";
    const bookmarkButton = new BookmarkComponent(this.idbService, wrapper, this.data);
    wrapper.appendChild(bookmarkButton);

    return wrapper;
  }

  render() {
    const wrapperElement = document.createElement("section");
    wrapperElement.className = "details-header";

    wrapperElement.innerHTML = `
      <img
        src="${BASE_IMAGE_URL}/${this.data.pictureId}"
        alt="Gambar ${this.data.name}"
        onerror="this.onerror=null;this.src='${noImage}';this.style.objectFit = 'contain';this.style.padding = '3rem'"
      />

      <div>
        <h1>${this.data.name}</h1>

        <div class="address">
          <h3>${this.data.city}</h3>
          <span><icon-pin></icon-pin>${this.data.address}</span>
        </div>

        <div class="rating">
          <h3>Rating</h3>
          <span class="rating-pill"><icon-star></icon-star> ${this.data.rating}</span>
        </div>

        <div class="categories">
          <h3>Kategori</h3>
          <span class="pill-container">${this.generateCategoriesEl()}</span>
        </div>
      </div>
    `;

    this.appendChild(wrapperElement);
    this.appendChild(this.createBookmarkButtonEl());
  }
}

customElements.define("details-header", DetailsHeaderComponent);
