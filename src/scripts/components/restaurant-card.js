const noImage = require("../../public/images/no-image.png");

export default class RestaurantCardComponent extends HTMLElement {
  imageUrl = "";
  name = "";
  location = "";
  rating = 0;

  constructor(data) {
    super();
    const { pictureId, name, city, rating } = data;

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
          src="${this.imageUrl}"
          alt="gambar ${this.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='${noImage}';this.style.objectFit = 'contain';this.style.padding = '3rem'"
          tabindex="0"
        />

        <div class="restaurant-info">
          <h2 tabindex="0">${this.name}</h2>

          <div class="details">
            <span class="rating">
              <icon-star></icon-star>
              <p tabindex="0">${this.rating}</p>
            </span>
              
            <span>
              <icon-pin></icon-pin>
              <p tabindex="0">${this.location}</p>
            </span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("restaurant-card", RestaurantCardComponent);
