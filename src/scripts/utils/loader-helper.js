const loadingEl = `
  <div id="loading">
    <img src="images/illustration/process.png" />
    <span>
      <h2>Mohon Tunggu</h2>
      <p>Konten sedang di proses...</p>
    </span>
  </div>
`;

export const showLoader = (parentTarget) => {
  if (parentTarget) document.getElementById(parentTarget).innerHTML = loadingEl;
  else document.getElementById("content").innerHTML = loadingEl;
};

export const hideLoader = () => {
  const loading = document.getElementById("loading");
  if (loading) loading.remove();
};
