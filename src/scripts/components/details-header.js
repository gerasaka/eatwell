import { BASE_IMAGE_URL } from "../constant/config";

const noImage = require("../../public/images/no-image.png");

export default class DetailsHeaderComponent extends HTMLElement {
  pictureId = "";
  name = "";
  city = "";
  address = "";
  rating = 0;
  categories = [];

  constructor(data) {
    super();
    const { pictureId, name, city, address, rating, categories } = data;

    this.pictureId = pictureId;
    this.name = name;
    this.city = city;
    this.address = address;
    this.rating = rating.toFixed(1);
    this.categories = categories;
  }

  connectedCallback() {
    this.render();
  }

  generateCategoriesEl() {
    const categories = this.categories.map(({ name }) => `<span class="pill-item">${name}</span>`);
    return categories.join("");
  }

  render() {
    const wrapperElement = document.createElement("section");
    wrapperElement.className = "details-header";

    wrapperElement.innerHTML = `
      <img
        src="${BASE_IMAGE_URL}/${this.pictureId}"
        alt="Gambar ${this.name}"
        onerror="this.onerror=null;this.src='${noImage}';this.style.objectFit = 'contain';this.style.padding = '3rem'"
      />

      <div>
        <h1>${this.name}</h1>

        <div class="address">
          <h3>${this.city}</h3>
          <span><icon-pin></icon-pin>${this.address}</span>
        </div>

        <div class="rating">
          <h3>Rating</h3>
          <span class="rating-pill"><icon-star></icon-star> ${this.rating}</span>
        </div>

        <div class="categories">
          <h3>Kategori</h3>
          <span class="pill-container">${this.generateCategoriesEl()}</span>
        </div>
      </div>
    `;

    this.appendChild(wrapperElement);
  }
}

customElements.define("details-header", DetailsHeaderComponent);
