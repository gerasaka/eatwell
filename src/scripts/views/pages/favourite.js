export default class FavouritePageComponent {
  async render(pageWrapper) {
    const el = document.createElement("h1");
    el.innerHTML = "Favourite";

    pageWrapper.appendChild(el);
  }

  async afterRender() {}
}
