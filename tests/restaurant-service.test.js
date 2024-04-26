import {
  DETAIL_RESTAURANT,
  REVIEW_RESTAURANT,
  SEARCH_RESTAURANT,
} from "../src/scripts/constant/api-path";
import RestaurantService from "../src/scripts/services/restaurant";
import { waitForAsyncProcess } from "./helper/eventHandler";
import { MOCK_MELTING_POT } from "./mocks/restaurant-details.mock";
import { MOCK_SEARCH_ALL, MOCK_SEARCH_KAFE } from "./mocks/search-result.mock";
import { MOCK_CUSTOMER_REVIEW } from "./mocks/submit-review.mock";

global.fetch = jest.fn();

describe("Restaurant service", () => {
  const restaurantService = new RestaurantService();
  const addContentWrapperEl = () => {
    document.body.innerHTML = '<div id="content"><div id="loading-wrapper"></div></div>';
  };

  const expectLoadingWhileProcessing = async () => {
    expect(document.getElementById("loading")).toBeTruthy();

    await waitForAsyncProcess();

    expect(document.getElementById("loading")).toBeFalsy();
  };

  beforeEach(() => {
    addContentWrapperEl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getRestaurantList function", () => {
    it("should return restaurant list successfully", async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ restaurants: MOCK_SEARCH_ALL }),
      });

      const result = await restaurantService.getRestaurantList();

      expect(result).toBeTruthy();
      expect(result).toHaveLength(20);
    });

    it("should show loader when called and fetch processing", async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ restaurants: MOCK_SEARCH_ALL }),
      });

      restaurantService.getRestaurantList();

      await expectLoadingWhileProcessing();
    });

    it("should return empty array when fetch process failed", async () => {
      fetch.mockRejectedValueOnce("intentional error - fetch details");

      const result = await restaurantService.getRestaurantList();

      expect(result).toBeTruthy();
      expect(result).toEqual([]);
    });
  });

  describe("getRestaurantDetails function", () => {
    it("should return restaurant details for restaurant with given id", async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ restaurant: MOCK_MELTING_POT }),
      });

      const result = await restaurantService.getRestaurantDetails("rqdv5juczeskfw1e867");

      expect(fetch).toHaveBeenCalledWith(DETAIL_RESTAURANT + "/rqdv5juczeskfw1e867");
      expect(result).toBeTruthy();
      expect(result).toEqual(MOCK_MELTING_POT);
    });

    it("should return undefined when restaurant not found or id given is empty", async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({}),
      });

      expect(await restaurantService.getRestaurantDetails("123")).toEqual(undefined);
      expect(await restaurantService.getRestaurantDetails()).toEqual(undefined);
      expect(await restaurantService.getRestaurantDetails(" ")).toEqual(undefined);
      expect(await restaurantService.getRestaurantDetails("\t")).toEqual(undefined);
    });

    it("should show loader when fetching process", async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ restaurant: MOCK_MELTING_POT }),
      });

      restaurantService.getRestaurantDetails("rqdv5juczeskfw1e867");

      await expectLoadingWhileProcessing();
    });

    it("should return undefined when fetch process failed", async () => {
      fetch.mockRejectedValueOnce("intetional error - fetch details");

      const result = await restaurantService.getRestaurantDetails("rqdv5juczeskfw1e867");

      expect(result).toBeFalsy();
      expect(result).toEqual(undefined);
    });
  });

  describe("searchRestaurant function", () => {
    it("should return restaurant list that match with given query", async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ restaurants: MOCK_SEARCH_KAFE }),
      });

      const result = await restaurantService.searchRestaurant("kafe");

      expect(fetch).toHaveBeenCalledWith(SEARCH_RESTAURANT + "kafe");
      expect(result).toBeTruthy();
      expect(result).toEqual(MOCK_SEARCH_KAFE);
    });

    it("should return empty array when restaurant not found", async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ restaurants: [] }),
      });

      const result = await restaurantService.searchRestaurant("123");

      expect(result).toBeTruthy();
      expect(result).toEqual([]);
    });

    it("should return all restaurant list when query is empty string or not given", async () => {
      fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue({ restaurants: MOCK_SEARCH_ALL }),
      });

      expect(await restaurantService.searchRestaurant()).toEqual(MOCK_SEARCH_ALL);
      expect(await restaurantService.searchRestaurant(undefined)).toEqual(MOCK_SEARCH_ALL);
      expect(await restaurantService.searchRestaurant("")).toEqual(MOCK_SEARCH_ALL);
      expect(await restaurantService.searchRestaurant(" ")).toEqual(MOCK_SEARCH_ALL);
      expect(await restaurantService.searchRestaurant("\t")).toEqual(MOCK_SEARCH_ALL);
    });

    it("should show loader when fetching process", async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ restaurant: MOCK_MELTING_POT }),
      });

      restaurantService.searchRestaurant("kafe");

      await expectLoadingWhileProcessing();
    });

    it("should return empty array when fetch process failed", async () => {
      fetch.mockRejectedValueOnce("intetional error - fetch details");

      const result = await restaurantService.searchRestaurant("kafe");

      expect(result).toEqual([]);
    });
  });

  describe("submitReview function", () => {
    it("should fetch data with proper body request and headers", async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ customerReviews: MOCK_CUSTOMER_REVIEW }),
      });

      const id = "rqdv5juczeskfw1e867";
      const name = "Budi";
      const review = "Bagus";

      await restaurantService.submitReview(id, name, review);

      expect(fetch).toHaveBeenCalledWith(REVIEW_RESTAURANT, {
        method: "POST",
        body: JSON.stringify({ id, name, review }),
        headers: { "Content-Type": "application/json" },
      });
    });

    it("should be able to submit review successfully", async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ customerReviews: MOCK_CUSTOMER_REVIEW }),
      });

      const result = await restaurantService.submitReview("rqdv5juczeskfw1e867", "Budi", "Bagus");

      expect(result).not.toHaveLength(0);
      expect(result).toEqual(MOCK_CUSTOMER_REVIEW);
    });

    it("should response with new review", async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ customerReviews: MOCK_CUSTOMER_REVIEW }),
      });

      const result = await restaurantService.submitReview("rqdv5juczeskfw1e867", "Budi", "Bagus");

      expect(result[result.length - 1]).toHaveProperty("name", "Budi");
      expect(result[result.length - 1]).toHaveProperty("review", "Bagus");
    });

    it("should show success toast after success add review", async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ customerReviews: MOCK_CUSTOMER_REVIEW }),
      });

      await restaurantService.submitReview("rqdv5juczeskfw1e867", "Budi", "Bagus");

      expect(document.getElementById("toast")).toBeTruthy();
      expect(document.getElementsByTagName("icon-check")).toBeTruthy();
    });

    it("should show error toast when failed add review", async () => {
      fetch.mockRejectedValueOnce("intetional error - search resturant failed");

      await restaurantService.submitReview("rqdv5juczeskfw1e867", "Budi", "Bagus");

      expect(document.getElementById("toast")).toBeTruthy();
      expect(document.getElementsByTagName("icon-cross")).toBeTruthy();
    });

    it("should return null when one of the params empty", async () => {
      fetch.mockRejectedValue({ error: true, message: "intetional error" });

      expect(await restaurantService.submitReview(undefined, "Budi", "Bagus")).toEqual(null);
      expect(await restaurantService.submitReview("", "Budi", "Bagus")).toEqual(null);
      expect(await restaurantService.submitReview("rqdv5jucz", undefined, "Bagus")).toEqual(null);
      expect(await restaurantService.submitReview("rqdv5jucz", "", "Bagus")).toEqual(null);
      expect(await restaurantService.submitReview("rqdv5jucz", "Budi", undefined)).toEqual(null);
      expect(await restaurantService.submitReview("rqdv5jucz", "Budi", "")).toEqual(null);

      expect(document.getElementById("toast")).toBeTruthy();
    });

    it("should return null when fetch process failed", async () => {
      fetch.mockRejectedValueOnce("intetional error - search resturant failed");

      const result = await restaurantService.submitReview("rqdv5juczeskfw1e867", "Budi", "Bagus");

      expect(result).toEqual(null);
      expect(document.getElementById("toast")).toBeTruthy();
    });
  });
});
