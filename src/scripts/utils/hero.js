export default function animateCarousel() {
  const source = document.getElementById("small-hero");
  const heroItem = document.getElementById("carousel-item");

  // start from hero image 2
  let counter = 2;

  setInterval(() => {
    if (counter === 5) counter = 1;
    heroItem.className = "fade-hero";

    setTimeout(() => {
      const sourceExt = source.srcset.split(".")[2];
      const imgExt = heroItem.src.split(".")[1];

      source.srcset = `./images/heroes/hero-image_${counter}-small.${sourceExt}`;
      heroItem.src = `./images/heroes/hero-image_${counter}-large.${imgExt}`;
      counter++;
      heroItem.removeAttribute("class");
    }, 500);
  }, 5000);
}
