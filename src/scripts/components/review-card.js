export default class ReviewCardComponent extends HTMLElement {
  author = "";
  date = "";
  content = "";

  constructor(data) {
    super();
    const { name, date, review } = data;

    this.author = name;
    this.date = date;
    this.content = review;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="review-item">
        <h3 tabindex="0">${this.author}</h3>
        <p tabindex="0">${this.date}</p>
        <p tabindex="0">${this.content}</p>
      </div>
    `;
  }
}

customElements.define("review-card", ReviewCardComponent);
