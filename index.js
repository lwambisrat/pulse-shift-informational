// FAQ toggle functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement; // .sub-faq
    item.classList.toggle('active');

    const arrow = question.querySelector('.arrow');
    arrow.textContent = item.classList.contains('active') ? '-' : '+';
  });
});

// Search functionality (enable only if search bar is uncommented in HTML)
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
  const faqItems = document.querySelectorAll('.sub-faq');
  const noResultMsg = document.createElement('div');
  noResultMsg.textContent = 'No results found.';
  noResultMsg.style.textAlign = 'center';
  noResultMsg.style.marginTop = '10px';
  noResultMsg.style.display = 'none';
  document.querySelector('.faq-main').appendChild(noResultMsg);

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    let anyVisible = false;
    faqItems.forEach(item => {
      const questionText = item.querySelector('.faq-question span').textContent.toLowerCase();
      if (questionText.includes(query) && query !== '') {
        item.style.display = 'block';
        anyVisible = true;
      } else if (query === '') {
        item.style.display = 'block';
        anyVisible = true;
      } else {
        item.style.display = 'none';
      }
    });
    noResultMsg.style.display = anyVisible ? 'none' : 'block';
  });
}
    document.addEventListener("DOMContentLoaded", () => {
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('nav-menu');
      let isOpen = false;
      hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        isOpen = !isOpen;
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
