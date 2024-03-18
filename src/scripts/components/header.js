const eatwellLogo = require("../../public/images/logo/eatwell-logo-transparent.png");

export class Header extends HTMLElement {
  isDrawerOpen = false;
  navWrapper = null;
  ulElement = null;

  connectedCallback() {
    this.render();
  }

  createDrawer() {
    const btnElement = document.createElement("button");
    btnElement.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        height="24px"
        width="24px"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    `;
    this.appendChild(btnElement);

    this.navWrapper = this.querySelector("nav");
    this.ulElement = this.querySelector("ul");

    const button = this.querySelector("button");
    button.addEventListener("click", () => this.toggleDrawer());
  }

  toggleDrawer() {
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
      <img src="${eatwellLogo}" alt="logo eatwell" />

      <nav class="overlay">
        <ul class="drawer">
          <li><a href="index.html">Beranda</a></li>
          <li><a href="#">Favorit</a></li>
          <li><a href="https://github.com/gerasaka">Tentang Kami</a></li>
        </ul>
      </nav>
    `;

    this.createDrawer();
  }
}

customElements.define("header-content", Header);
