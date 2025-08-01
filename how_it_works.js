function search() {
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput) {
        alert(`Searching for: ${searchInput}`);

    } else {
        alert('Please enter a search term!');
    }
}

function getStarted() {
    alert('Redirecting to Get Started page!');
}


(function () {
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentIndex = 0;
  let intervalId = null;
  const AUTO_INTERVAL = 5000;
  function updateCarousel() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === slides.length - 1;
  }
  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1;
    }
    updateCarousel();
  }
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
  });
  function startAuto() {
    intervalId = setInterval(nextSlide, AUTO_INTERVAL);
  }
  function stopAuto() {
    clearInterval(intervalId);
    intervalId = null;
  }
  document.querySelector('.carousel-container').addEventListener('mouseenter', stopAuto);
  document.querySelector('.carousel-container').addEventListener('mouseleave', startAuto);
  document.querySelector('.carousel-container').addEventListener('focusin', stopAuto);
  document.querySelector('.carousel-container').addEventListener('focusout', startAuto);
  startAuto();
  updateCarousel();
})();

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (!hamburger || !navMenu) {
    console.error("Hamburger or nav-menu element not found!");
    return;
  }

  let isOpen = false;

  hamburger.addEventListener('click', () => {
    isOpen = !isOpen;
    navMenu.classList.toggle('active', isOpen);
    hamburger.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        isOpen = false;
      }
    });
  });
});

function subscribeNewsletter(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.querySelector('input[type="email"]').value;
  if (email) {
    alert('Thank you for subscribing, ' + email + '!');
    form.reset();
  }
}