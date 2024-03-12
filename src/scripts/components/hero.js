const hero1 = require("../../public/images/heroes/hero-image_1.jpg");
const hero2 = require("../../public/images/heroes/hero-image_2.jpg");
const hero3 = require("../../public/images/heroes/hero-image_3.jpg");
const hero4 = require("../../public/images/heroes/hero-image_4.jpg");

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
