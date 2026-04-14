document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".custom-dropdown-menu");
    const subDropdowns = document.querySelectorAll(".dropdown-submenu");

    const closeAllMenus = (except = null) => {
        dropdowns.forEach((dropdown) => {
            if (dropdown !== except) {
                const toggle = dropdown.querySelector(".dropdown-toggle");
                const menu = dropdown.querySelector(".dropdown-menu");
                toggle.classList.remove("show");
                menu.classList.remove("show");
                dropdown.dataset.clickedOnce = "false";
            }
        });
    };

    const closeAllSubMenus = (parent, except = null) => {
        const subs = parent.querySelectorAll(".dropdown-submenu");
        subs.forEach((sub) => {
            if (sub !== except) {
                sub.querySelector(".dropdown-toggle").classList.remove("show");
                sub.querySelector(".dropdown-menu").classList.remove("show");
            }
        });
    };

    // ANA DROPDOWNLAR
    dropdowns.forEach(function (dropdown) {
        const toggle = dropdown.querySelector(".dropdown-toggle");
        const menu = dropdown.querySelector(".dropdown-menu");
        let closeTimeout = null;

        const openMenu = () => {
            clearTimeout(closeTimeout);
            closeAllMenus(dropdown); // 👈 Yeni açılan hariç diğerlerini kapat
            toggle.classList.add("show");
            menu.classList.add("show");
        };

        const closeMenu = () => {
            closeTimeout = setTimeout(() => {
                toggle.classList.remove("show");
                menu.classList.remove("show");
                dropdown.dataset.clickedOnce = "false";
            }, 400);
        };

        // DESKTOP HOVER
        dropdown.addEventListener("mouseenter", () => {
            if (window.innerWidth >= 1200) openMenu();
        });

        dropdown.addEventListener("mouseleave", () => {
            if (window.innerWidth >= 1200) closeMenu();
        });

        menu.addEventListener("mouseenter", () => {
            if (window.innerWidth >= 1200) clearTimeout(closeTimeout);
        });

        menu.addEventListener("mouseleave", () => {
            if (window.innerWidth >= 1200) closeMenu();
        });

        // CLICK (MOBİL VE DESKTOP LİNK)
        toggle.addEventListener("click", function (e) {
            if (window.innerWidth >= 1200) {
                window.location.href = toggle.getAttribute("href");
            } else {
                e.preventDefault();
                // Eğer zaten açıksa linke git, kapalıysa aç
                if (dropdown.dataset.clickedOnce === "true") {
                    window.location.href = toggle.getAttribute("href");
                } else {
                    openMenu();
                    dropdown.dataset.clickedOnce = "true";
                }
            }
        });
    });

    // ALT MENÜLER (SUBMENU)
    subDropdowns.forEach(function (subDropdown) {
        const subToggle = subDropdown.querySelector(".dropdown-toggle");
        const subMenu = subDropdown.querySelector(".dropdown-menu");
        const parentMenu = subDropdown.closest(".dropdown-menu");

        subToggle.addEventListener("click", function (e) {
            if (window.innerWidth < 1200) {
                e.preventDefault();
                e.stopPropagation(); // Üst menünün kapanmasını engelle

                // Aynı seviyedeki diğer alt menüleri kapat
                closeAllSubMenus(parentMenu, subDropdown);

                subToggle.classList.toggle("show");
                subMenu.classList.toggle("show");
            }
        });

        // Desktop hover için alt menü desteği
        if (window.innerWidth >= 1200) {
            subDropdown.addEventListener("mouseenter", () => {
                closeAllSubMenus(parentMenu, subDropdown);
                subToggle.classList.add("show");
                subMenu.classList.add("show");
            });
        }
    });

    // Dışarıya tıklandığında her şeyi kapat (Opsiyonel ama önerilir)
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".custom-dropdown-menu")) {
            closeAllMenus();
        }
    });
});