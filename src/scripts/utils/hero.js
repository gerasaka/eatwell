import hero1 from "../../public/images/heroes/hero-image_1.jpg";
import hero2 from "../../public/images/heroes/hero-image_2.jpg";
import hero3 from "../../public/images/heroes/hero-image_3.jpg";
import hero4 from "../../public/images/heroes/hero-image_4.jpg";

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
