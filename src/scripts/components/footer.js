import { showToast } from "../utils/toast-helper";

export default class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  subscribeEmail() {
    if (this.querySelector("#email").value) {
      this.querySelector(".mail").reset();
      showToast("success", "Email berhasil ditambahkan, nantikan info menarik dari kami!");
    } else {
      showToast("failed", "Field email belum diisi");
    }
  }

  render() {
    this.innerHTML = `
      <div class="social">
        <h3 tabindex="0">Kontak kami</h3>
        <span>
          <a href="https://www.instagram.com/" class="icon-wrapper" aria-label="instagram">
            <icon-instagram class="social-icon"></icon-instagram>
            <span class="social-label">Instagram</span>
          </a>
          <a href="https://twitter.com/" class="icon-wrapper" aria-label="x">
            <icon-x class="social-icon"></icon-x> 
            <span class="social-label">X</span></a>
          <a href="https://www.facebook.com/" class="icon-wrapper" aria-label="facebook">
            <icon-facebook class="social-icon"></icon-facebook>
            <span class="social-label">Facebook</span>
          </a>
        </span>

        <h3 tabindex="0">Dapatkan informasi terbaru dari kami</h3>
        <form class="mail">
          <input aria-label="field input email" type="text" id="email" class="form-field" placeholder="Masukkan email anda" />
          <button id="submit-email">Kirim</button>
        </form>
      </div>

      <div class="copy">
        <picture>
          <source media="(max-width: 600px)" srcset="./images/illustration/chef-small.webp">
          <img
            src='./images/illustration/chef-large.webp' 
            alt="ilustrasi chef"
            loading="lazy"
          >
        </picture>
        <p tabindex="0">Copyright &#169; 2024 - eatwell</p>
      </div>
    `;

    this.querySelector("#submit-email").addEventListener("click", (e) => {
      e.preventDefault();
      this.subscribeEmail();
    });
  }
}

customElements.define("footer-content", FooterComponent);
