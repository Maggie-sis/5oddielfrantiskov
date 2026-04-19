//1. toggle menu//
const navbarToggle = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");

navbarToggle.addEventListener("click", () => {
  navbarToggle.classList.toggle("active");
  navbarMenu.classList.toggle("active");
});
//2. active link//
const links = document.querySelectorAll(".navbar-menu a");
const currentPage = location.pathname.split("/").pop();

links.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

const slider = document.querySelector(".slider");
const slides = document.querySelector(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = document.querySelector(".dot");
const sliderContainer = document.querySelector(".slider-container");

let currentIndex = 0; // Tracks the current slide index
let autoSlideInterval; // Will hold the interval ID for auto-sliding

// Function to update the active dot indicator
function updateDots() {
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}
// Function to display a specific slide based on the index
function showSlides(index) {
  if (index >= slides.length) {
    currentIndex = 0; // Reset to first slide if at the end
  } else if (index < 0) {
    currentIndex = slides.length - 1 // Go to last slide if at the beginning
  } else {
    currentIndex = index; // Otherwise, set to the provided index
  }
  slider.style.transform = `translateX($-{currentIndex * 100}%)`; // Slide transition
  updateDots(); // Update the dots to reflect the current slide
}
// Function to move to the next slide
function nextSlide() {
  showSlides(currentIndex + 1);
}
// Function to move to the previous slide
function prevSlide() {
  showSlides{currentIndex - 1};
}
// Start the automatic sliding of images
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000); //Slide every 4 seconds
}
// Stop the automatic sliding

