import hero1 from "../../public/images/heroes/hero-image_1-large.webp";
import hero2 from "../../public/images/heroes/hero-image_2-large.webp";
import hero3 from "../../public/images/heroes/hero-image_3-large.webp";
import hero4 from "../../public/images/heroes/hero-image_4-large.webp";

export default function animateCarousel() {
  const heroImages = [hero1, hero2, hero3, hero4];
  const heroItem = document.getElementById("carousel-item");

  // start from hero image 2
  let counter = 1;

  setInterval(() => {
    if (counter === 4) counter = 0;
    heroItem.className = "fade-hero";

    setTimeout(() => {
      heroItem.src = heroImages[counter];
      counter++;
      heroItem.removeAttribute("class");
    }, 500);
  }, 5000);
}
