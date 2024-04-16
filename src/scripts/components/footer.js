export default class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="social">
        <h3>Kontak kami</h3>
        <span>
          <a href="#" class="icon-wrapper">
            <icon-instagram class="social-icon"></icon-instagram>
            <span class="social-label">Instagram</span>
          </a>
          <a href="#" class="icon-wrapper">
            <icon-x class="social-icon"></icon-x> 
            <span class="social-label">X</span></a>
          <a href="#" class="icon-wrapper">
            <icon-facebook class="social-icon"></icon-facebook>
            <span class="social-label">Facebook</span>
          </a>
        </span>

        <h3>Dapatkan informasi terbaru dari kami</h3>
        <form class="mail">
          <span>
            <input type="text" id="email" class="form-field" placeholder="Masukkan email anda" />
            <button type="submit">Kirim</button>
          </span>
        </form>
      </div>

      <div class="copy">
        <img src="images/illustration/chef.png" alt="ilustrasi customer service" />
        <p tabindex="0">Copyright &#169; 2024 - eatwell</p>
      </div>
    `;
  }
}

customElements.define("footer-content", FooterComponent);
