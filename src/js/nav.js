document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  
  if (toggle && links) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      links.classList.toggle('open');
      toggle.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') && !links.contains(e.target) && !toggle.contains(e.target)) {
        links.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }
});
