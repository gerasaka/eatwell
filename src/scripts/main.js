import "regenerator-runtime"; /* for async await transpile */

import "../styles/reset.css";
import "../styles/main.scss";

import * as comp from "./components";
import "./icons";

const restaurantList = require("../public/data/DATA.json").restaurants;
const restaurantContainer = document.getElementById("restaurant-container");

for (let i = 0; i < restaurantList.length; i++) {
  const restaurantItem = new comp.RestaurantCardComponent(restaurantList[i]);
  restaurantContainer.appendChild(restaurantItem);
}
