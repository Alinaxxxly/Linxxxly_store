const reviewsContainer = document.getElementById('reviewsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const cardWidth = 640; 
const visibleCards = 2;
const totalCards = reviewsContainer.children.length;

const maxIndex = Math.ceil(totalCards / visibleCards) - 1;
let currentIndex = 0;

function updateButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === maxIndex;
}

function updateCarousel() {
  reviewsContainer.style.transform = `translateX(-${currentIndex * cardWidth * visibleCards}px)`;
  updateButtons();
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
});

updateButtons();
