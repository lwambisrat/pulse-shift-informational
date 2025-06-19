

const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function setActiveCard(index) {
    cards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => setActiveCard(idx));
});

cards.forEach((card, idx) => {
    card.addEventListener('click', () => setActiveCard(idx));
});