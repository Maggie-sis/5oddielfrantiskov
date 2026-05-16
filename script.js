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
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");
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
    currentIndex = slides.length - 1; // Go to last slide if at the beginning
  } else {
    currentIndex = index; // Otherwise, set to the provided index
  }
  slider.style.transform = `translateX(-${currentIndex * 100}%)`; // Slide transition
  updateDots(); // Update the dots to reflect the current slide
}
// Function to move to the next slide
function nextSlide() {
  showSlides(currentIndex + 1);
}
// Function to move to the previous slide
function prevSlide() {
  showSlides(currentIndex - 1);
}
// Start the automatic sliding of images
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000); //Slide every 4 seconds
}
// Stop the automatic sliding
function stopAutoSlide() {
  clearInterval(autoSlideInterval); // Clear the interval to stop auto-sliding
}
// Add event listeners to dots for direct navigation
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    stopAutoSlide(); // Stop auto-slide when manually selecting a slide
    showSlides(parseInt(dot.dataset.index)) // Show the selected slide 
    startAutoSlide(); // Restart auto-slide
  });
});
// Add event listeners to navigation buttons
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Stop auto-slide when the mouse enters the slider container
sliderContainer.addEventListener("mouseover", stopAutoSlide);

// Restart auto-slide when the mouse leaves the slider container
sliderContainer.addEventListener("mouseout", startAutoSlide);

// Start auto-sliding when the page loads
startAutoSlide();
updateDots(); // Initialize the dots

//Touch/Swipe Support
// Store where the finger first touched the screen
let touchStartX = 0;

// When finger touches screen, record the X position
sliderContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});
// When finger lifts, calculate how far it moved
sliderContainer.addEventListener(touchend, (e)=> {
  const touchEndX = e.changedTouches[0].clientX; 
  const diff = touchStart - touchEndX;

  if (diff > 50) {
     // Swiped LEFT → go to next slide (50px threshold avoids accidental triggers)
     stopAutoSlide();
     nextSlide();
     startAutoSlide();
  } else if (diff < - 50) {
    // Swiped RIGHT → go to previous slide
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  }
   // If diff is between -50 and 50, it was just a tap - do nothing
});