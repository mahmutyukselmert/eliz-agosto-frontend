export function initLogoSwap(threshold = 20) {
    const header = document.querySelector("header");
    if (!header) return;

    const logo = header.querySelector(".navbar-brand img");
    if (!logo) return;

    const originalSrc = logo.getAttribute("src");
    const scrolledSrc = logo.dataset.scrolledimage;

    if (!originalSrc || !scrolledSrc) return;

    function handleScroll() {
        if (window.scrollY > threshold) {
            if (!logo.src.includes(scrolledSrc)) {
                logo.src = scrolledSrc;
            }
        } else {
            if (!logo.src.includes(originalSrc)) {
                logo.src = originalSrc;
            }
        }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
}