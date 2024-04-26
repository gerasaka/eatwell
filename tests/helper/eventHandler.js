export const waitForAsyncProcess = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));
};

export const clickBookmarkButton = async () => {
  document.getElementById("bookmark").dispatchEvent(new Event("click"));
  await waitForAsyncProcess();
};

export const searchRestaurant = async (query) => {
  document.getElementById("query").value = query;
  document.getElementById("submit-search").click();

  await waitForAsyncProcess();
};

export const submitNewReview = (name, review) => {
  const nameField = document.getElementById("author");
  const reviewField = document.getElementById("review");
  const submitButton = document.getElementById("submit-review");

  nameField.value = name;
  reviewField.value = review;
  submitButton.dispatchEvent(new Event("click"));
};
