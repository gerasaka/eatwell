export default class HamburgerIcon extends HTMLElement {
  size = "";
  color = "";

  constructor(size = "24", color = "currentColor") {
    super();

    this.size = size;
    this.color = color;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        height="${this.size}"
        width="24px"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="${this.color}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    `;
  }
}

customElements.define("icon-hamburger", HamburgerIcon);
