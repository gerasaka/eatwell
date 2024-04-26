const assert = require("assert");

Feature("Review restaurant");

Before(({ I }) => {
  I.amOnPage("/");
});

Scenario("review restaurant", async ({ I }) => {
  I.seeElement('.restaurant-item');

  const firstRestaurantItem = locate("//a[starts-with(@href, '#/details/')]").first();
  
  I.click(firstRestaurantItem);

  const beforeReviewsLength = await I.grabNumberOfVisibleElements('.review-item')
  
  I.seeElement('.review-form');
  I.seeElement('#author');
  I.seeElement('#review');
  I.seeElement('#submit-review');
  
  I.fillField("name","e2e tester");
  I.fillField("review","e2e reviewing restaurant");
  I.click('#submit-review');
  
  I.see('Berhasil menambah ulasan')
  
  const afterReviewsLength = await I.grabNumberOfVisibleElements('.review-item');

  assert.strictEqual(beforeReviewsLength + 1, afterReviewsLength);
});
