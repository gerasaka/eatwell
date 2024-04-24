import { BookmarkComponent, SearchBarComponent } from "../../src/scripts/components";

export const createBookmarkButtonEl = async (idbService, restaurant) => {
  const bookmarkButtonEl = new BookmarkComponent(idbService, restaurant);
  document.getElementById("bookmarkContainer").appendChild(bookmarkButtonEl);

  // wait to the button render
  await new Promise((resolve) => {
    const check = () => {
      if (document.querySelector("#bookmark")) resolve();
      else requestAnimationFrame(check);
    };
    check(); // Start checking
  });
};

export const renderSearchBarEl = (restaurantService) => {
  const searchBarEl = new SearchBarComponent(restaurantService);

  document.body.innerHTML =
    '<div class="list-wrapper"><div class="restaurant-container"></div></div>';
  document.querySelector(".list-wrapper").appendChild(searchBarEl);
};
