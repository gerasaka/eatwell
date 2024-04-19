import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, Route } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

const dicodingRestaurantApi = new Route(
  ({ url }) => url.href.startsWith("https://restaurant-api.dicoding.dev"),
  new StaleWhileRevalidate({
    cacheName: "dicoding-restaurant-api",
  }),
);

const dicodingRestaurantImageApi = new Route(
  ({ url }) => url.href.startsWith("https://restaurant-api.dicoding.dev/images/medium"),
  new StaleWhileRevalidate({
    cacheName: "dicoding-restaurant-image-api",
  }),
);

registerRoute(dicodingRestaurantApi);
registerRoute(dicodingRestaurantImageApi);

self.addEventListener("install", () => {
  console.log("Service Worker: Installed");
  self.skipWaiting();
});

self.addEventListener("push", () => {
  console.log("Service Worker: Pushed");
});
