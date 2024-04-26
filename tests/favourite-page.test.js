import FavouritePageComponent from "../src/scripts/views/pages/favourite";
import { MOCK_SEARCH_KAFE } from "./mocks/search-result.mock";

describe("Favourite page", () => {
  const idbService = {
    getAllBookmark: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderFavouritePage = async () => {
    document.body.innerHTML = "";
    const contentWrapper = document.createElement("div");
    contentWrapper.id = "content";

    const favouritePageComponent = new FavouritePageComponent({}, idbService);
    await favouritePageComponent.render(contentWrapper);

    document.body.appendChild(contentWrapper);
  };

  it("should check all saved restaurant", async () => {
    idbService.getAllBookmark.mockResolvedValue(MOCK_SEARCH_KAFE);

    await renderFavouritePage();

    expect(idbService.getAllBookmark).toHaveBeenCalled();
  });

  it("should show restaurant list when favourite list exist", async () => {
    idbService.getAllBookmark.mockResolvedValue(MOCK_SEARCH_KAFE);

    await renderFavouritePage();

    expect(document.querySelector(".restaurant-item")).toBeTruthy();
  });

  it("should show illustration for no favourite list when no restaurant saved", async () => {
    idbService.getAllBookmark.mockResolvedValue([]);

    await renderFavouritePage();

    expect(document.querySelector(".restaurant-item")).toBeFalsy();
    expect(document.querySelector('[alt="ilustrasi list restoran kosong"]')).toBeTruthy();
  });
});
