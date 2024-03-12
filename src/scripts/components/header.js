const eatwellLogo = require("../../public/images/logo/eatwell-logo-transparent.png");

export class Header extends HTMLElement {
  isNavbarOpen = false;

  connectedCallback() {
    this.render();
  }

  setNavbar(e) {
    e.stopPropagation();
    this.isNavbarOpen = !this.isNavbarOpen;

    const navWrapper = this.querySelector("nav");
    const ulElement = this.querySelector("ul");

    if (this.isNavbarOpen) {
      navWrapper.className = "overlay";
      ulElement.className = "open-nav";
    } else {
      navWrapper.removeAttribute("class");
      ulElement.removeAttribute("class");
    }
  }

  render() {
    this.innerHTML = `
    <img src="${eatwellLogo}" alt="logo eatwell" />

    <button>
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
    </button>

    <nav>
      <ul>
        <li><a href="index.html">Beranda</a></li>
        <li><a href="#">Favorit</a></li>
        <li><a href="https://github.com/gerasaka">Tentang Kami</a></li>
      </ul>
    </nav>
    `;

    const button = this.querySelector("button");
    button.addEventListener("click", (e) => this.setNavbar(e));
  }
}

customElements.define("header-content", Header);
