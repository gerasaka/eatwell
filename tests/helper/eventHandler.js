export const clickBookmarkButton = async () => {
  document.getElementById("bookmark").dispatchEvent(new Event("click"));
  await waitForAsyncProcess();
};

export const waitForAsyncProcess = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));
};
