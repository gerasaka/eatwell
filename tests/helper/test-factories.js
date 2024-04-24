import { BookmarkComponent } from "../../src/scripts/components";

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
