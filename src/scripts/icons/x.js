export default class XIcon extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const color = this.getAttribute("color") ?? "currentColor";

    this.innerHTML = `
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9V15C22 20 20 22 15 22Z"
          stroke="${color}"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.9514 11.2343L16.6741 7H15.7919L12.5595 10.6766L9.97773 7H7L10.9041 12.5597L7 17H7.88222L11.2958 13.1174L14.0223 17H17L12.9514 11.2343ZM11.743 12.6087L11.3475 12.055L8.20009 7.64984H9.55512L12.0951 11.205L12.4907 11.7586L15.7923 16.3797H14.4373L11.743 12.6087Z"
          fill="${color}"
        />
      </svg>    
    `;
  }
}

customElements.define("icon-x", XIcon);
