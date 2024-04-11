export default class DetailsPageComponent {
  _restaurantService = undefined;

  constructor(restaurantService) {
    this._restaurantService = restaurantService;
  }

  async render(pageWrapper) {
    pageWrapper.innerHTML = `
      <div id="details-wrapper">
        <img src="images/heroes/hero-image_1.jpg" alt="" />

        <section class="details-header">
          <h1>Melting Pot</h1>

          <div class="address">
            <h4>Medan</h4>
            <span><icon-pin></icon-pin> Jln. Pandeglang no 19</span>
          </div>

          <div class="rating">
            <h3>Rating</h3>
            <span><icon-star></icon-star> 4.2</span>
          </div>

          <div class="categories">
            <h3>Kategori</h3>
            <span class="pill-item">Italia</span>
            <span class="pill-item">Modern</span>
          </div>
        </section>

        <p class="description">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
          Aenean massa. ...
        </p>

        <section>
          <h2>Menu</h2>

          <div class="menu-container">
            <div>
              <p>Makanan</p>
              <div class="menu-display">
                <img src="images/illustration/food.png" alt="" />
                <ul>
                  <li>Paket rosemary</li>
                  <li>Toastie salmon</li>
                </ul>
              </div>
            </div>
            <div>
              <p>Minuman</p>
              <div class="menu-display">
                <img src="images/illustration/drink.png" alt="" />
                <ul>
                  <li>Es krim</li>
                  <li>Sirup</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Ulasan</h2>
          <div class="review-item">
            <h3>ahmad</h3>
            <p>13 November 2019</p>
            <p>Tidak rekomendasi untuk pelajar!</p>
          </div>
        </section>
      </div>
    `;
  }
}
