const startCounter = (obj, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const targetValue = parseInt(el.dataset.value);
      if (!isNaN(targetValue)) {
        startCounter(el, 0, targetValue, 2000);
      }
      observer.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.countup').forEach(el => {
  counterObserver.observe(el);
});