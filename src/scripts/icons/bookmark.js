export default class BookmarkIcon extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const size = this.getAttribute("size") ?? "16";
    const color = this.getAttribute("color") ?? "currentColor";
    const bookmarked = this.getAttribute("bookmark") ?? "0";

    this.innerHTML = `
      <svg
        height="${size}"
        width="${size}"
        xmlns="http://www.w3.org/2000/svg"
        fill="${bookmarked === "1" ? color : "none"}"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="${color}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </svg>
    `;
  }
}

customElements.define("icon-bookmark", BookmarkIcon);
