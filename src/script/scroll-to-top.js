export function initScrollToTop() {
    const footer = document.getElementById("footer");
    const scrollToTop = document.getElementById("scroll-to-top");
    if (!footer || !scrollToTop) return;
    function handleScroll() {
        const footerPosition = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (footerPosition.top < windowHeight) {
            scrollToTop.classList.remove("d-none");
        } else {
            scrollToTop.classList.add("d-none");
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
}