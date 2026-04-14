export function initHeaderFixed(threshold = 50) {
    const header = document.querySelector('header');
    if (!header) return;
    function handleScroll() {
        if (window.scrollY > threshold) {
            header.classList.add('fixed-top');
        } else {
            header.classList.remove('fixed-top');
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
}