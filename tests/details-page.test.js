import DetailsPageComponent from "../src/scripts/views/pages/details";
import { MOCK_MELTING_POT } from "./mocks/restaurant-details.mock";

describe("Details page", () => {
  const restaurantService = { getRestaurantDetails: jest.fn() };
  const idbService = { getRestaurant: jest.fn() };

  const renderDetailsPage = async () => {
    const contentWrapper = document.createElement("div");
    contentWrapper.id = "content";
    const homePageComponent = new DetailsPageComponent(restaurantService, idbService);

    await homePageComponent.render(contentWrapper);

    document.body.appendChild(contentWrapper);
  };

  beforeEach(async () => {
    restaurantService.getRestaurantDetails.mockResolvedValue(MOCK_MELTING_POT);
    await renderDetailsPage();
  });

  it("should called function to get restaurant details data", () => {
    expect(restaurantService.getRestaurantDetails).toHaveBeenCalled();
  });

  it("should called function to check if the restaurant is in favourite list", () => {
    expect(idbService.getRestaurant).toHaveBeenCalled();
  });

  it("should show details header and its content", () => {
    expect(document.querySelector(".details-header")).toBeTruthy();
    expect(document.getElementsByTagName("h1")).toBeTruthy();
    expect(document.querySelector(".address")).toBeTruthy();
    expect(document.querySelector(".rating")).toBeTruthy();
    expect(document.querySelector(".categories")).toBeTruthy();
  });

  it("should show restaurant description", () => {
    expect(document.querySelector(".description")).toBeTruthy();
  });

  it("should show restaurant menu", () => {
    expect(document.querySelector(".menu-wrapper")).toBeTruthy();
    expect(document.querySelector('[alt="ilustrasi makanan"]'));
    expect(document.querySelector('[alt="ilustrasi minuman"]'));
  });

  it("should show restaurant review form", () => {
    expect(document.querySelector(".review-form")).toBeTruthy();
    expect(document.getElementById("author")).toBeTruthy();
    expect(document.getElementById("review")).toBeTruthy();
    expect(document.getElementById("submit-review")).toBeTruthy();
  });

  it("should show restaurant customer reviews", () => {
    expect(document.querySelector(".review-wrapper")).toBeTruthy();
    expect(document.querySelector(".review-container")).toBeTruthy();
  });
});
