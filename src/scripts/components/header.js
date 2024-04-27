import { HamburgerIcon } from "../icons";

export default class HeaderComponent extends HTMLElement {
  isDrawerOpen = false;
  navWrapper = null;
  ulElement = null;

  connectedCallback() {
    this.render();
  }

  createDrawer() {
    const btnElement = document.createElement("button");
    btnElement.appendChild(new HamburgerIcon());
    this.appendChild(btnElement);

    this.navWrapper = this.querySelector("nav");
    this.ulElement = this.querySelector("ul");

    const button = this.querySelector("button");
    button.addEventListener("click", (e) => this.toggleDrawer(e));
  }

  toggleDrawer(e) {
    e.stopPropagation();
    this.isDrawerOpen = !this.isDrawerOpen;

    if (this.isDrawerOpen) {
      this.navWrapper.classList.add("show-overlay");
      this.ulElement.classList.add("open-drawer");
    } else {
      this.navWrapper.classList.toggle("show-overlay");
      this.ulElement.classList.toggle("open-drawer");
    }
  }

  render() {
    this.innerHTML = `
      <img src="./logo/eatwell-logo-transparent.png" alt="logo eatwell" />

      <nav class="overlay">
        <ul class="drawer">
          <li><a href="#/beranda">Beranda</a></li>
          <li><a href="#/favorit">Favorit</a></li>
          <li><a href="https://github.com/gerasaka">Tentang Kami</a></li>
        </ul>
      </nav>
    `;

    this.createDrawer();
  }
}

customElements.define("header-content", HeaderComponent);
