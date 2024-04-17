import { BASE_IMAGE_URL } from "../constant/config";

const noImage = require("../../public/images/no-image.png");

export default class RestaurantCardComponent extends HTMLElement {
  id = "";
  imageUrl = "";
  name = "";
  location = "";
  rating = 0;

  constructor(data) {
    super();
    const { id, pictureId, name, city, rating } = data;

    this.id = id;
    this.imageUrl = pictureId;
    this.name = name;
    this.location = city;
    this.rating = rating.toFixed(1);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="restaurant-item" tabindex="0">
        <img
          src="${BASE_IMAGE_URL}/${this.imageUrl}"
          alt="gambar ${this.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='${noImage}';this.style.objectFit = 'contain';this.style.padding = '3rem'"
          tabindex="0"
        />

        <div class="restaurant-info">
          <h2><a href="#/details/${this.id}">${this.name}</a></h2>

          <div class="details">
            <span>
              <icon-pin></icon-pin>
              <p tabindex="0">${this.location}</p>
            </span>

            <span class="rating-pill">
              <icon-star></icon-star>
              <p tabindex="0">${this.rating}</p>
            </span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("restaurant-card", RestaurantCardComponent);
