const noImage = require("../../public/images/no-image.png");

export class RestaurantCard extends HTMLElement {
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
    this.rating = rating;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="restaurant-item">
        <img
          src="${this.imageUrl}"
          alt="gambar ${this.name}"
          onerror="this.onerror=null;this.src='${noImage}';this.style.objectFit = 'contain';this.style.padding = '3rem'"
        />

        <div class="restaurant-info">
          <h2>${this.name}</h2>

          <div class="details">
            <span class="rating">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                width="16px"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>

              <p>${this.rating}</p>
            </span>
              
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                height="16px"
                width="16px"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#88bbaf"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <p>${this.location}</p>
            </span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("restaurant-card", RestaurantCard);
