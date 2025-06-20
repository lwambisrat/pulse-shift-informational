const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const carousel = document.querySelector('.testimonials-carousel');
const cardsPerPage = 2; 
function scrollToPage(pageIdx, smooth = true) {
  const firstCardIdx = pageIdx * cardsPerPage;
  const card = cards[firstCardIdx];
  if (card) {

    const scrollLeft = card.offsetLeft - carousel.offsetLeft;
    carousel.scrollTo({ left: scrollLeft, behavior: smooth ? 'smooth' : 'auto' });
  }
  dots.forEach((dot, i) => dot.classList.toggle('active', i === pageIdx));
}


dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => scrollToPage(idx));
});


scrollToPage(0, false);