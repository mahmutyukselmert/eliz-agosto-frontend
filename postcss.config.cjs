const purgecss = require("@fullhuman/postcss-purgecss").default;
module.exports = {
  plugins: [
    purgecss({
      content: [
        "./dist/**/*.html",
        "./dist/*.html",
        "./src/**/*.html",
        "./src/pages/*.html",
        "./src/pages/**/*.html",
        "./src/**/*.js"
      ],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        standard: [
          "fade", "show", "active", "collapsing", 
          "modal-backdrop", "is-invalid", "is-valid"
        ],
        deep: [
          // Aktif Olanlar
          /^carousel-/,    
          /^modal-/,       
          /^bs-/,          
          /^dropdown-/,
          // Lazım olduğunda açabileceğimiz diğer JS destekli bileşenler
          // /^offcanvas-/,   
          // /^toast-/,
          // /^tooltip-/,
          // /^popover-/,
          // /^accordion-/
        ]
      }
    })
  ],
};