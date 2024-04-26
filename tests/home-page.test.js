import HomePageComponent from "../src/scripts/views/pages/home";
import { MOCK_SEARCH_ALL } from "./mocks/search-result.mock";

global.fetch = jest.fn();

describe("Home page", () => {
  const restaurantService = { getRestaurantList: jest.fn(), searchRestaurant: jest.fn() };

  const renderHomePage = async () => {
    const contentWrapper = document.createElement("div");
    contentWrapper.id = "content";
    const homePageComponent = new HomePageComponent(restaurantService);

    await homePageComponent.render(contentWrapper);

    document.body.appendChild(contentWrapper);
  };

  beforeEach(async () => {
    restaurantService.getRestaurantList.mockResolvedValueOnce(MOCK_SEARCH_ALL);
    await renderHomePage();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show hero element", () => {
    expect(document.getElementById("carousel-item")).toBeTruthy();
  });

  it("should show search bar", () => {
    expect(document.querySelector(".search-form")).toBeTruthy();
  });

  it("should call getRestaurantList to get restaurant list", () => {
    expect(restaurantService.getRestaurantList).toHaveBeenCalledTimes(1);
  });

  it("should show restaurant list when list is not empty", () => {
    const restaurantItems = document.querySelectorAll(".restaurant-item");

    expect(restaurantItems).toBeTruthy();
    expect(restaurantItems).not.toHaveLength(0);
  });

  it("should show empty illustration when restaurant list is empty", async () => {
    document.body.innerHTML = "<div></div>";
    restaurantService.getRestaurantList.mockResolvedValueOnce([]);
    await renderHomePage();

    expect(document.querySelector(".restaurant-item")).toBeFalsy();
    expect(document.querySelector('[alt="ilustrasi list restoran kosong"')).toBeTruthy();
  });
});
