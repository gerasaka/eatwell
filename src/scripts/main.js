import "regenerator-runtime"; /* for async await transpile */

import "../styles/reset.css";
import "../styles/main.scss";

import "./icons";

import "./components";
import App from "./views/app";
import swRegister from "./utils/sw-register";

const app = new App();

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", async () => {
  app.renderPage();
  await swRegister();
});
