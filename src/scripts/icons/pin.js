export default class PinIcon extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const size = this.getAttribute("size") ?? "16";
    const color = this.getAttribute("color") ?? "#88bbaf";

    this.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        height="${size}"
        width="${size}"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="${color}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    `;
  }
}

customElements.define("icon-pin", PinIcon);
