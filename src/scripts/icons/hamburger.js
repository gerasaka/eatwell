export default class HamburgerIcon extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const size = this.getAttribute("size") ?? "24";
    const color = this.getAttribute("color") ?? "currentColor";

    this.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        height="${size}"
        width="${size}"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="${color}"
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
