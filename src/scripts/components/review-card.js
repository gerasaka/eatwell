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
        <h3>${this.author}</h3>
        <p>${this.date}</p>
        <p>${this.content}</p>
      </div>
    `;
  }
}

customElements.define("review-card", ReviewCardComponent);
