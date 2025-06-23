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