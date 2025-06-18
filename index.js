const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');


navToggle.addEventListener('click', () => {
 navToggle.classList.toggle('active');
 navLinks.classList.toggle('show');
});
