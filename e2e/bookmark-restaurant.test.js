const assert = require("assert");

Feature("Bookmark restaurant");

Before(({ I }) => {
  I.amOnPage("/");
});

let savedRestaurant = ''

Scenario("verify restaurant item exist", async ({ I }) => {
  I.seeElement('.restaurant-item');

  const firstRestaurantItem = locate("//a[starts-with(@href, '#/details/')]").first();

  savedRestaurant = await I.grabTextFrom(firstRestaurantItem);
});

Scenario("saving restaurant", async ({ I }) => {
  const firstRestaurantItem = locate("//a[starts-with(@href, '#/details/')]").first();

  I.click(firstRestaurantItem);

  const restaurantTitle = await I.grabTextFrom("h1");

  assert.strictEqual(savedRestaurant, restaurantTitle)

  I.seeElement('#bookmark');
  I.click('#bookmark');
  I.see('Restoran ditambahkan ke daftar favorit');

  I.amOnPage("/#/favorit");
  I.seeElement('.restaurant-item');

  assert.strictEqual(savedRestaurant, restaurantTitle)

  // un bookmark element
  I.click(firstRestaurantItem);
  I.click('#bookmark');
  I.see('Restoran dihapus dari daftar favorit');

  I.amOnPage("/#/favorit");
  I.dontSee(savedRestaurant)
})