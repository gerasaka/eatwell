export default class SearchIcon extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const size = this.getAttribute("size") ?? "16";
    const color = this.getAttribute("color") ?? "currentColor";

    this.innerHTML = `
      <svg
        height="${size}"
        width="${size}"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="${color}"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    `;
  }
}

customElements.define("icon-search", SearchIcon);
