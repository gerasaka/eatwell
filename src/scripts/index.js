import "regenerator-runtime"; /* for async await transpile */

import "../styles/reset.css";
import "../styles/main.scss";

import "./components/header";
import "./components/hero";
import { RestaurantCard } from "./components/restaurant-card";

const restaurantList = require("../public/data/DATA.json").restaurants;
const restaurantContainer = document.getElementById("restaurant-container");

for (let i = 0; i < restaurantList.length; i++) {
  const restaurantItem = new RestaurantCard(restaurantList[i]);
  restaurantContainer.appendChild(restaurantItem);
}
