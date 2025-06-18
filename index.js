document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
      const item = question.parentElement;
      const arrow = question.querySelector('.arrow');
      item.classList.toggle('active');
      arrow.textContent = item.classList.contains('active') ? '-':'+';
  });
});
const searchInput = document.querySelector('.search-bar input');
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
