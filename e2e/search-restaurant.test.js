const assert = require("assert");

Feature("Search restaurant");

Before(({ I }) => {
  I.amOnPage("/");
});

Scenario("showing search bar", ({ I }) => {
  I.seeElement(".search-form");
  I.seeElement("#query");
  I.seeElement("#submit-search");
});

Scenario("verify the first restaurant item doesn't contain word 'kafe'", async ({ I }) => {
  I.seeElement('.restaurant-item');

  const firstRestaurantItem = locate(".restaurant-item").first();
	const firstRestauranTitle = await I.grabTextFrom(firstRestaurantItem);

  assert.doesNotMatch(firstRestauranTitle, /kafe/i);
})

Scenario("searching restaurant", async ({ I }) => {
  I.fillField("query","kafe");
  I.click("#submit-search");

  const firstRestaurantItem = locate(".restaurant-item").first();
	const firstRestauranTitle = await I.grabTextFrom(firstRestaurantItem);

  assert.match(firstRestauranTitle, /kafe/i);
})