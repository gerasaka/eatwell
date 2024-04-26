import IndexDBService from "../src/scripts/services/indexDB";
import { clickBookmarkButton } from "./helper/eventHandler";
import { createBookmarkButtonEl } from "./helper/test-factories";
import { MOCK_MELTING_POT } from "./mocks/restaurant-details.mock";

describe("Bookmark restaurant", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="content"><div id="bookmarkContainer"></div></div>';
  };

  const _idbService = new IndexDBService();

  beforeEach(() => {
    addLikeButtonContainer();
  });

  describe("Bookmark button", () => {
    it("should show when the restaurant has not been saved before", async () => {
      await createBookmarkButtonEl(_idbService, MOCK_MELTING_POT);
      expect(document.querySelector('[aria-label="Simpan restoran ini"]')).toBeTruthy();
    });

    it("should be able to bookmark the restaurant", async () => {
      await createBookmarkButtonEl(_idbService, MOCK_MELTING_POT);
      await clickBookmarkButton();

      const allBookmarkedRestaurant = await _idbService.getAllBookmark();
      const savedRestaurant = await _idbService.getRestaurant(MOCK_MELTING_POT.id);

      expect(allBookmarkedRestaurant).toHaveLength(1);
      expect(savedRestaurant).toHaveProperty("id", MOCK_MELTING_POT.id);

      await _idbService.removevRestaurant(MOCK_MELTING_POT.id);
    });
  });

  describe("Active bookmark button", () => {
    it("should show the active bookmark button when the restaurant has been saved before", async () => {
      await _idbService.putRestaurant(MOCK_MELTING_POT);

      await createBookmarkButtonEl(_idbService, MOCK_MELTING_POT);

      expect(document.querySelector('[aria-label="Simpan restoran ini"]')).toBeFalsy();
      expect(document.querySelector('[aria-label="Hapus restoran dari favorit"]')).toBeTruthy();

      await _idbService.removevRestaurant(MOCK_MELTING_POT.id);
    });

    it("should be able to remove restaurant from IndexDB", async () => {
      await _idbService.putRestaurant(MOCK_MELTING_POT);

      await createBookmarkButtonEl(_idbService, MOCK_MELTING_POT);
      await clickBookmarkButton();

      const allBookmarkedRestaurant = await _idbService.getAllBookmark();
      const savedRestaurant = await _idbService.getRestaurant(MOCK_MELTING_POT.id);

      expect(allBookmarkedRestaurant).toHaveLength(0);
      expect(savedRestaurant).toBeFalsy();
    });
  });
});
