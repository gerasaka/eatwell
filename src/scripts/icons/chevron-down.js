export default class ChevronDownIcon extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const color = this.getAttribute("color") ?? "currentColor";

    this.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="${color}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
        />
      </svg>
    `;
  }
}

customElements.define("icon-chevron-down", ChevronDownIcon);
