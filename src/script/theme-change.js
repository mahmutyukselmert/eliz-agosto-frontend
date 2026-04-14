document.addEventListener("DOMContentLoaded", function () {

  const themeToggler = document.getElementById('theme-toggler');
  const html = document.documentElement;

  const lightIcon = document.querySelector('.light-icon');
  const darkIcon = document.querySelector('.dark-icon');

  // 1. Sadece localStorage'da önceden kaydedilmiş bir şey varsa al
  const savedTheme = localStorage.getItem('theme');

  // 2. Eğer daha önce kaydedilmiş bir tema varsa onu uygula, YOKSA HTML'dekine dokunma!
  if (savedTheme) {
    html.setAttribute('data-bs-theme', savedTheme);
  }

  // 3. İkonları şu an HTML'de yazan (veya localstorage'dan gelen) temaya göre ayarla
  const currentInitialTheme = html.getAttribute('data-bs-theme');
  updateIcons(currentInitialTheme);

  // Tıklama Olayı (Aynı kalıyor)
  themeToggler.addEventListener('click', function () {
    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcons(newTheme);
  });

  function updateIcons(theme) {
    if (!lightIcon || !darkIcon) return;
    if (theme === 'dark') {
      darkIcon.classList.add('active');
      lightIcon.classList.remove('active');
    } else {
      lightIcon.classList.add('active');
      darkIcon.classList.remove('active');
    }
  }

});