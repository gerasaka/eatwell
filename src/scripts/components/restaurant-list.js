import { LIST_RESTAURANT } from "../constant/api-path";
import RestaurantCardComponent from "./restaurant-card";

export default async function generateRestaurantList() {
  let restaurantList = [];
  const restaurantContainer = document.getElementById("restaurant-container");

  await fetch(LIST_RESTAURANT)
    .then((res) => res.json())
    .then((data) => (restaurantList = data.restaurants))
    // eslint-disable-next-line no-console
    .catch((err) => console.log("error occurs", err));

  if (restaurantList.length) {
    restaurantList.forEach((restaurant) => {
      const restaurantItem = new RestaurantCardComponent(restaurant);
      restaurantContainer.appendChild(restaurantItem);
    });
  } else {
    const emptyWrapper = document.createElement("div");
    emptyWrapper.className = "empty-wrapper";
    emptyWrapper.innerHTML = `
      <img src="../images/illustration/blank.png" alt="ilustrasi list restoran kosong" />
      <p>Sedang terjadi masalah atau tidak ada restoran untuk ditampilkan</p>
    `;

    restaurantContainer.appendChild(emptyWrapper);
  }
}
