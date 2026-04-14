document.addEventListener("DOMContentLoaded", function () {
  const mainLinks = document.querySelectorAll('.main-nav-link');
  const panes = document.querySelectorAll('.menu-pane');

  // Hem hover hem click durumunda çalışacak ortak fonksiyon
  function activateMenu(e, link) {
    e.preventDefault(); // Sayfanın en üste atlamasını engeller

    const targetPaneId = link.getAttribute('data-pane');

    // Aktif sınıflarını temizle
    mainLinks.forEach(l => l.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));

    // Hedefi aktif yap
    link.classList.add('active');
    const targetPane = document.getElementById(targetPaneId);
    
    if (targetPane) {
      targetPane.classList.add('active');

      // Mobilde menüye tıklandığında, alt menülerin olduğu alana ekranı hafifçe kaydır (UX için çok önemlidir)
      if (window.innerWidth < 992) {
        targetPane.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  mainLinks.forEach(link => {
    // Masaüstü için (Fare üzerine gelince)
    link.addEventListener('mouseenter', function (e) {
      if (window.innerWidth >= 992) {
        activateMenu(e, this);
      }
    });

    // Mobil için (Dokunulunca/Tıklanınca)
    link.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        activateMenu(e, this);
      }
    });
  });
});