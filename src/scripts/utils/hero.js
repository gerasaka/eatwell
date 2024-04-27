export default function animateCarousel() {
  const source = document.getElementById("small-hero");
  const heroItem = document.getElementById("carousel-item");

  // start from hero image 2
  let counter = 2;

  setInterval(() => {
    if (counter === 5) counter = 1;
    heroItem.className = "fade-hero";

    setTimeout(() => {
      source.srcset = `./images/heroes/hero-image_${counter}-small.webp`;
      heroItem.src = `./images/heroes/hero-image_${counter}-large.webp`;
      counter++;
      heroItem.removeAttribute("class");
    }, 500);
  }, 5000);
}
