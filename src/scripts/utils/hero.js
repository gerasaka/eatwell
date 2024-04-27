export default function animateCarousel() {
  const heroItem = document.getElementById("carousel-item");

  // start from hero image 2
  let counter = 2;

  setInterval(() => {
    if (counter === 5) counter = 1;
    heroItem.className = "fade-hero";

    setTimeout(() => {
      const srcValue = heroItem.src.split(".");
      const ext = srcValue[1];
      const size = srcValue[0].split("-")[2];

      heroItem.src = `./images/heroes/hero-image_${counter}-${size}.${ext}`;
      counter++;
      heroItem.removeAttribute("class");
    }, 500);
  }, 5000);
}
