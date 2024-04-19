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

        <h3 tabindex="0">Dapatkan informasi terbaru dari kami</h3>
        <form class="mail">
          <input type="text" id="email" class="form-field" placeholder="Masukkan email anda" />
          <button id="submit-email">Kirim</button>
        </form>
      </div>

      <div class="copy">
        <img src="images/illustration/chef.png" alt="ilustrasi chef" />
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
