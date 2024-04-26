import DetailsPageComponent from "../src/scripts/views/pages/details";
import { submitNewReview, waitForAsyncProcess } from "./helper/eventHandler";
import { MOCK_MELTING_POT } from "./mocks/restaurant-details.mock";
import { MOCK_CUSTOMER_REVIEW } from "./mocks/submit-review.mock";

describe("Review restaurant", () => {
  const restaurantService = {
    getRestaurantDetails: jest.fn().mockResolvedValue(MOCK_MELTING_POT),
    submitReview: jest.fn(),
  };

  const idbService = {
    getRestaurant: jest.fn().mockResolvedValueOnce({}),
  };

  const renderDetailsPage = async () => {
    document.body.innerHTML = "";
    const contentWrapper = document.createElement("div");
    contentWrapper.id = "content";
    const detailsPageComponent = new DetailsPageComponent(restaurantService, idbService);

    await detailsPageComponent.render(contentWrapper);

    document.body.appendChild(contentWrapper);
  };

  beforeEach(async () => {
    await renderDetailsPage();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add new review successfully", async () => {
    restaurantService.submitReview.mockResolvedValue(MOCK_CUSTOMER_REVIEW);

    submitNewReview("Budi", "Bagus");

    await waitForAsyncProcess();

    expect(restaurantService.submitReview).toHaveBeenCalled();
  });

  it("should post submit with body request", async () => {
    restaurantService.submitReview.mockResolvedValueOnce(MOCK_CUSTOMER_REVIEW);

    submitNewReview("Budi", "Bagus");

    await waitForAsyncProcess();

    expect(restaurantService.submitReview).toHaveBeenCalledWith(
      MOCK_MELTING_POT.id,
      "Budi",
      "Bagus",
    );
  });

  it("should clear form after submit review", async () => {
    restaurantService.submitReview.mockResolvedValueOnce(MOCK_CUSTOMER_REVIEW);

    submitNewReview("Budi", "Bagus");

    await waitForAsyncProcess();

    expect(document.getElementById("author").value).toBe("");
    expect(document.getElementById("review").value).toBe("");
  });

  it("should render new review after submit", async () => {
    expect(document.querySelectorAll(".review-item")).toHaveLength(2);

    submitNewReview("Budi", "Bagus");

    await waitForAsyncProcess();

    const reviewItems = document.querySelectorAll(".review-item");

    expect(document.querySelectorAll(".review-item")).toHaveLength(3);
    expect(reviewItems[2].querySelector("h3").textContent).toBe("Budi");
  });

  it("should not add review if name or review field empty", () => {
    submitNewReview("", "Bagus");
    expect(restaurantService.submitReview).not.toHaveBeenCalled();

    submitNewReview("Budi", "");
    expect(restaurantService.submitReview).not.toHaveBeenCalled();

    submitNewReview("", "");
    expect(restaurantService.submitReview).not.toHaveBeenCalled();
  });

  it("should not add review if post process failed", () => {
    expect(document.querySelectorAll(".review-item")).toHaveLength(2);

    restaurantService.submitReview.mockRejectedValueOnce("intentional error - failed add review");

    submitNewReview("Budi", "Bagus");

    expect(document.querySelectorAll(".review-item")).toHaveLength(2);
  });
});
