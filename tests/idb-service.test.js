import IndexDBService from "../src/scripts/services/indexDB";
import { MOCK_KAFE_KITA, MOCK_MELTING_POT } from "./mocks/restaurant-details.mock";

describe("IndexDBService", () => {
  const _idbService = new IndexDBService();

  const addRestaurantData = async () => {
    await _idbService.putRestaurant(MOCK_MELTING_POT);

    expect(await _idbService.getAllBookmark()).toHaveLength(1);
  };

  describe("putRestaurant function", () => {
    it("should be able to put new data to DB", async () => {
      expect(await _idbService.getAllBookmark()).toHaveLength(0);

      await addRestaurantData();

      expect(await _idbService.getRestaurant(MOCK_MELTING_POT.id)).toHaveProperty(
        "id",
        MOCK_MELTING_POT.id,
      );

      await _idbService.removevRestaurant(MOCK_MELTING_POT.id);
    });

    it("should not add duplicate restaurant data", async () => {
      await addRestaurantData();

      expect(await _idbService.getRestaurant(MOCK_MELTING_POT.id)).toHaveProperty(
        "id",
        MOCK_MELTING_POT.id,
      );

      await addRestaurantData();

      expect(await _idbService.getRestaurant(MOCK_MELTING_POT.id)).toHaveProperty(
        "id",
        MOCK_MELTING_POT.id,
      );

      await _idbService.removevRestaurant(MOCK_MELTING_POT.id);
    });

    it("should not add data when the restaurant param is not given", async () => {
      expect(await _idbService.putRestaurant()).toEqual({});
      expect(await _idbService.getAllBookmark()).toHaveLength(0);
    });
  });

  describe("getAllBookmark function", () => {
    it("should return empty array if there is no bookmarked restaurant", async () => {
      await _idbService.getAllBookmark();

      expect(await _idbService.getAllBookmark()).toHaveLength(0);
    });

    it("should return all bookmarked restaurant if any", async () => {
      await addRestaurantData();
      await _idbService.putRestaurant(MOCK_KAFE_KITA);

      expect(await _idbService.getAllBookmark()).toHaveLength(2);

      await _idbService.removevRestaurant(MOCK_MELTING_POT.id);
      await _idbService.removevRestaurant(MOCK_KAFE_KITA.id);
    });
  });

  describe("removevRestaurant function", () => {
    it("should be able to remove restaurant with given id", async () => {
      await addRestaurantData();
      await _idbService.putRestaurant(MOCK_KAFE_KITA);

      expect(await _idbService.getAllBookmark()).toHaveLength(2);

      await _idbService.removevRestaurant(MOCK_MELTING_POT.id);

      expect(await _idbService.getAllBookmark()).toHaveLength(1);

      await _idbService.removevRestaurant(MOCK_KAFE_KITA.id);

      expect(await _idbService.getAllBookmark()).toHaveLength(0);
    });

    it("should not remove restaurant if the id param given is empty or not found", async () => {
      await addRestaurantData();
      await _idbService.removevRestaurant(MOCK_KAFE_KITA.id);

      expect(await _idbService.getAllBookmark()).toHaveLength(1);
    });
  });

  describe("getRestaurant function", () => {
    it("should be able to get restaurant data with given id", async () => {
      await addRestaurantData();

      const restaurantDetails = await _idbService.getRestaurant(MOCK_MELTING_POT.id);

      expect(restaurantDetails).toBeTruthy();
      expect(restaurantDetails).toHaveProperty("id", MOCK_MELTING_POT.id);
    });

    it("should not return restaurant data when the data not found", async () => {
      await addRestaurantData();

      const restaurantDetails = await _idbService.getRestaurant(MOCK_KAFE_KITA.id);

      expect(restaurantDetails).toBeFalsy();
    });

    it("should not return restaurant data when the id param given is empty", async () => {
      await addRestaurantData();

      expect(await _idbService.getRestaurant()).toEqual({});
    });
  });
});
