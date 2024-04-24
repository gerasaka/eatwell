import { SearchBarComponent } from "../src/scripts/components";
import { waitForAsyncProcess } from "./helper/eventHandler";
import { MOCK_SEARCH_ALL, MOCK_SEARCH_KAFE } from "./mocks/search-result";

describe("Search restaurant", () => {
  const restaurantService = { searchRestaurant: jest.fn() };

  const renderSearchBarEl = () => {
    const searchBarEl = new SearchBarComponent(restaurantService);

    document.body.innerHTML =
      '<div class="list-wrapper"><div class="restaurant-container"></div></div>';
    document.querySelector(".list-wrapper").appendChild(searchBarEl);
  };

  const searchRestaurant = async (query) => {
    document.getElementById("query").value = query;
    document.getElementById("submit-search").click();

    await waitForAsyncProcess();
  };

  beforeEach(() => {
    renderSearchBarEl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when query is not empty", () => {
    it("should able to search with given query", async () => {
      restaurantService.searchRestaurant.mockResolvedValueOnce(MOCK_SEARCH_KAFE);

      await searchRestaurant("kafe");

      expect(restaurantService.searchRestaurant).toHaveBeenCalledTimes(1);
      expect(restaurantService.searchRestaurant).toHaveBeenCalledWith("kafe");
    });

    it("should render the result to UI", async () => {
      restaurantService.searchRestaurant.mockResolvedValueOnce(MOCK_SEARCH_KAFE);

      await searchRestaurant("kafe");

      expect(document.querySelector(".restaurant-container")).toBeTruthy();
      expect(document.querySelectorAll(".restaurant-item")).toHaveLength(4);
    });

    it("should show result that macth given query", async () => {
      restaurantService.searchRestaurant.mockResolvedValueOnce(MOCK_SEARCH_KAFE);

      await searchRestaurant("kafe");

      const fistResultRestaurantTitle = document.querySelector("h2").textContent;

      expect(fistResultRestaurantTitle.toLowerCase()).toContain("kafe");
    });
  });

  describe("when query is empty", () => {
    it("should search restaurant with empty query", async () => {
      restaurantService.searchRestaurant.mockResolvedValue(MOCK_SEARCH_ALL);

      await searchRestaurant("");

      expect(restaurantService.searchRestaurant).toHaveBeenCalled();
      expect(restaurantService.searchRestaurant).toHaveBeenCalledWith("");

      await searchRestaurant();

      expect(restaurantService.searchRestaurant).toHaveBeenCalled();
      expect(restaurantService.searchRestaurant).toHaveBeenCalledWith("undefined");
    });

    it("should show all restaurant list", async () => {
      restaurantService.searchRestaurant.mockResolvedValueOnce(MOCK_SEARCH_ALL);

      await searchRestaurant("");

      expect(document.querySelector(".restaurant-container")).toBeTruthy();
      expect(document.querySelectorAll(".restaurant-item")).toHaveLength(20);
    });
  });

  describe("when the restaurant is not found", () => {
    it("should not show any restaurant card", async () => {
      restaurantService.searchRestaurant.mockResolvedValueOnce([]);

      await searchRestaurant("random");

      expect(document.querySelectorAll(".restaurant-item")).toHaveLength(0);
    });

    it("should show no restaurant list message", async () => {
      restaurantService.searchRestaurant.mockResolvedValueOnce([]);

      await searchRestaurant("random");

      expect(document.querySelector('[alt="ilustrasi list restoran kosong"]')).toBeTruthy();
      expect(document.querySelector("p").textContent).toBe(
        "Sedang terjadi masalah atau tidak ada restoran untuk ditampilkan",
      );
    });
  });
});
