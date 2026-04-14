/* all için bu kısım kullanabilirim
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
*/
//import Alert from 'bootstrap/js/dist/alert';
//import Button from 'bootstrap/js/dist/button';
import Carousel from "bootstrap/js/dist/carousel";
import Collapse from "bootstrap/js/dist/collapse";
import Dropdown from "bootstrap/js/dist/dropdown";
import Modal from "bootstrap/js/dist/modal";
//import Offcanvas from 'bootstrap/js/dist/offcanvas';
//import Popover from 'bootstrap/js/dist/popover';
//import ScrollSpy from 'bootstrap/js/dist/scrollspy';
import Tab from "bootstrap/js/dist/tab";
//import Toast from 'bootstrap/js/dist/toast';
//import Tooltip from 'bootstrap/js/dist/tooltip';

// global erişim gerekiyorsa
window.bootstrap = {
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Tab,
};

import ScrollReveal from "scrollreveal";
document.addEventListener("DOMContentLoaded", function () {
  const sr = ScrollReveal({
    duration: 1000,
    origin: "top",
    distance: "50px",
    easing: "ease-in-out",
    reset: false,
  });

  sr.reveal(".scroll-reveal");
  sr.reveal(".scroll-reveal-bottom", { origin: "bottom", distance: "100px" });
  sr.reveal(".scroll-reveal-left", { origin: "left" });
  sr.reveal(".scroll-reveal-left-step-1", {
    origin: "left",
    distance: "100px",
  });
  sr.reveal(".scroll-reveal-left-step-2", {
    origin: "left",
    distance: "150px",
  });
  sr.reveal(".scroll-reveal-right", { origin: "right" });
  sr.reveal(".scroll-reveal-top", { origin: "top" });
});

/*
import { initHeaderFixed } from './script/header-fixed.js';
import { initLogoSwap } from './script/logo-swap.js';
import { initScrollToTop } from './script/scroll-to-top.js';

document.addEventListener('DOMContentLoaded', function () {
  initHeaderFixed(50); 
  initLogoSwap(20);
  initScrollToTop();
});
*/

import SmartCarousel from "./script/slider.js";
document.addEventListener("DOMContentLoaded", () => {
  const smartSliders = document.querySelectorAll(
    '[data-module="smart-slider"]',
  );
  smartSliders.forEach((sliderEl) => {
    new SmartCarousel(sliderEl);
  });
});

//Counter Animation
//import './script/counter.js';

//Dropdown açılır menu
//import './script/dropdown-navbar.js';

import EmblaCarousel from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

document.addEventListener("DOMContentLoaded", function () {
  var emblaNode = document.querySelector("#productCarouselEmbla");
  if (!emblaNode) return;

  var viewportNode = emblaNode.querySelector(".embla__viewport");

  // Plugin Ayarları
  var autoplayOptions = {
    delay: 5000,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
  };

  // Embla Başlatma
  var emblaApiProductCarousel = EmblaCarousel(
    viewportNode,
    {
      loop: true,
      align: "start",
    },
    [Autoplay(autoplayOptions)],
  );

  var prevBtnProject = emblaNode.querySelector(".prev-btn");
  var nextBtnProject = emblaNode.querySelector(".next-btn");

  if (prevBtnProject) {
    prevBtnProject.addEventListener("click", function () {
      emblaApiProductCarousel.scrollPrev();
    });
  }

  if (nextBtnProject) {
    nextBtnProject.addEventListener("click", function () {
      emblaApiProductCarousel.scrollNext();
    });
  }
});

import { animate, stagger } from "animejs";
document.querySelectorAll(".animation-text").forEach((title) => {
  title.innerHTML = title.textContent
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");

  const spans = title.querySelectorAll("span");

  function animateIn() {
    animate(spans, {
      opacity: 1,
      translateY: 0,
      duration: 700,
      delay: stagger(40),
      easing: "easeOutExpo",
    });
  }

  function animateOut() {
    animate(spans, {
      opacity: 0,
      translateY: 40,
      duration: 400,
      delay: stagger(20),
      easing: "easeInExpo",
    });
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateIn();
      } else {
        animateOut();
      }
    },
    {
      threshold: 0.6,
    },
  );

  observer.observe(title);
});

document.querySelectorAll(".reveal-section").forEach((section) => {
  function show() {
    animate(section, {
      opacity: 1,
      translateY: 0,
      duration: 600,
      easing: "easeOutCubic",
    });
  }

  function hide() {
    animate(section, {
      opacity: 0,
      translateY: 40,
      duration: 500,
      easing: "easeInCubic",
    });
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        show();
      } else {
        hide();
      }
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(section);
});

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

document.querySelectorAll(".reveal-3d").forEach((el) => {
  function update() {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    const startTrigger = vh;
    const endTrigger = vh * 0.3;

    const progress = clamp(
      (startTrigger - rect.top) / (startTrigger - endTrigger),
    );

    animate(el, {
      opacity: progress,
      scale: 0.8 + progress * 0.2,
      translateY: 100 * (1 - progress),
      translateZ: [-500 * (1 - progress), 0],
      rotateX: 15 * (1 - progress),
      duration: 0,
      easing: "linear",
    });
  }

  update();

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );
});

/* OFFCANVAS */
//import './script/offcanvas-menu.js';

/* Tema Değiştirici */
//import './script/theme-change.js';

/* Diğer scriptler... */
// filter.js
import "./script/filter.js";

import { initProductGallery } from "./script/product-detail-thumb-slider.js";
document.addEventListener("DOMContentLoaded", () => {
  initProductGallery();
});

const referencesNode = document.querySelector("#referencesCarousel");
if (referencesNode) {
  const referencesViewport = referencesNode.querySelector(".embla__viewport");
  const referencesAutoplayOptions = {
    delay: 2500,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
  };
  const emblaApiReferences = EmblaCarousel(
    referencesViewport,
    {
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
    },
    [Autoplay(referencesAutoplayOptions)],
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById('imageZoomModal');
  if (!modal) return;

  const carouselInner = modal.querySelector(".carousel-inner");
  const images = document.querySelectorAll(".zoomable-image");

  let clickedIndex = 0;

  // Tıklanan index'i yakala
  images.forEach((img, index) => {
    img.closest("a").addEventListener("click", function () {
      clickedIndex = index;
    });
  });

  // Modal açılınca
  modal.addEventListener('show.bs.modal', function () {
    carouselInner.innerHTML = ""; // temizle
    images.forEach((img, index) => {
      const src = img.getAttribute("src");

      const isActive = index === clickedIndex ? "active" : "";

      const item = `
                <div class="carousel-item ${isActive}">
                    <div class="d-flex justify-content-center align-items-center" style="height:100vh;">
                        <img src="${src}" class="img-fluid" style="max-height:90vh;">
                    </div>
                </div>
            `;

      carouselInner.insertAdjacentHTML("beforeend", item);
    });
  });

  // Modal kapanınca temizle (önemli!)
  modal.addEventListener('hidden.bs.modal', function () {
    carouselInner.innerHTML = "";
  });
});