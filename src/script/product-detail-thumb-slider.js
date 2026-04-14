import EmblaCarousel from 'embla-carousel';

export function initProductGallery() {
  const mainNode = document.querySelector('#productCarouselMain');
  const thumbNode = document.querySelector('#productCarouselThumbs');

  // Sayfada slider yoksa çık
  if (!mainNode || !thumbNode) return;

  // ÇÖZÜM 1: Wrapper'ı sayfanın genelinden değil, sadece bizim slider'ın ebeveyninden (closest) alıyoruz.
  // Bu sayede sayfada başka slider varsa kodlar birbirine girmez.
  const wrapperNode = mainNode.closest('.main-slider-wrapper'); 

  const mainViewport = mainNode.querySelector('.embla__viewport');
  const thumbViewport = thumbNode.querySelector('.embla__viewport');

  if (!mainViewport || !thumbViewport || !wrapperNode) return;

  const emblaMain = EmblaCarousel(mainViewport, {
    loop: true,
    skipSnaps: false
  });

  const emblaThumbs = EmblaCarousel(thumbViewport, {
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  // Okları seçiyoruz
  const prevBtn = wrapperNode.querySelector('.prev-btn');
  const nextBtn = wrapperNode.querySelector('.next-btn');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      emblaMain.scrollPrev();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      emblaMain.scrollNext();
    });
  }

  const thumbSlides = emblaThumbs.slideNodes();

  const toggleThumbBtnsState = () => {
    const selected = emblaMain.selectedScrollSnap();
    emblaThumbs.scrollTo(selected);
    
    thumbSlides.forEach((slideNode, index) => {
      if (index === selected) {
        slideNode.classList.add('is-selected');
      } else {
        slideNode.classList.remove('is-selected');
      }
    });
  };

  const onThumbClick = (index, e) => {
    e.preventDefault(); // Tıklanınca sayfanın zıplamasını engeller
    if (!emblaMain) return;
    emblaMain.scrollTo(index);
  };

  thumbSlides.forEach((slideNode, index) => {
    const btn = slideNode.querySelector('.thumb-btn');
    if (btn) {
      btn.addEventListener('click', (e) => onThumbClick(index, e));
    }
  });

  // ÇÖZÜM 3: Fonksiyonu rastgele çağırmak yerine Embla 'init' (başlatıldı) olayına bağladık.
  emblaMain.on('init', toggleThumbBtnsState);
  emblaMain.on('select', toggleThumbBtnsState);
  emblaMain.on('reInit', toggleThumbBtnsState);
}