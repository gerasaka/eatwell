export default class Favorite {
  async render(pageWrapper) {
    const el = document.createElement("h1");
    el.innerHTML = "Favorite";

    pageWrapper.appendChild(el);
  }

  async afterRender() {}
}
