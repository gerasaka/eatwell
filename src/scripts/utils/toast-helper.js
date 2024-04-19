const toastIcon = {
  success: "<icon-check size='18'></icon-check>",
  failed: "<icon-cross size='18'></icon-cross>",
};

export const showToast = (type, message) => {
  const toastEl = document.createElement("div");
  toastEl.id = "toast";
  toastEl.className = `toast-${type}`;
  toastEl.innerHTML = `
    ${toastIcon[type]}
    <span>${message}</span>
  `;

  document.getElementById("content").appendChild(toastEl);

  setTimeout(() => {
    const toastEl = document.getElementById("toast");
    if (toastEl) toastEl.remove();
  }, 3500);
};
