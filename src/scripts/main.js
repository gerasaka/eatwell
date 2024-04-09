import "regenerator-runtime"; /* for async await transpile */

import "../styles/reset.css";
import "../styles/main.scss";

import "./icons";

import * as comp from "./components";

comp.generateRestaurantList();
