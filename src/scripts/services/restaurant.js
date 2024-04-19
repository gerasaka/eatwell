import {
  DETAIL_RESTAURANT,
  LIST_RESTAURANT,
  REVIEW_RESTAURANT,
  SEARCH_RESTAURANT,
} from "../constant/api-path";
import { showToast } from "../utils/toast-helper";

export class RestaurantService {
  async getRestaurantList() {
    let result = [];

    try {
      const response = await fetch(LIST_RESTAURANT);
      const data = await response.json();
      result = data.restaurants;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("error occurs when fetch restaurant list", err);
    }

    return result;
  }

  async getRestaurantDetails(id) {
    let result = null;

    try {
      const response = await fetch(DETAIL_RESTAURANT + `/${id}`);
      const data = await response.json();
      result = data.restaurant;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("error occurs when fetch restaurant details", err);
    }

    return result;
  }

  async searchRestaurant(query) {
    let result = [];

    try {
      const response = await fetch(SEARCH_RESTAURANT + query);
      const data = await response.json();
      result = data.restaurants;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("error occurs when searching restaurant", err);
    }

    return result;
  }

  async submitReview(id, name, review) {
    let result = null;

    try {
      const response = await fetch(REVIEW_RESTAURANT, {
        method: "POST",
        body: JSON.stringify({ id, name, review }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      result = data.customerReviews;
      showToast("success", "Berhasil menambah ulasan");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("error occurs when submitting review", err);
      showToast("failed", "Gagal menambahkan ulasan");
    }

    return result;
  }
}
