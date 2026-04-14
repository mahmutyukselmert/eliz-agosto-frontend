import fs from "fs";
import path from "path";

const pagesDir = "src/pages";
const distDir = "dist";

// Font klasör yolları
const fontSrcDir = "node_modules/bootstrap-icons/font/fonts";
const fontDestDir = path.join(distDir, "assets/css/fonts");

// Klasör oluştur
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Bootstrap icon fontlarını kopyala
function copyFonts() {
  if (fs.existsSync(fontSrcDir)) {
    ensureDir(fontDestDir);
    const fonts = fs.readdirSync(fontSrcDir);
    
    fonts.forEach(font => {
      const srcPath = path.join(fontSrcDir, font);
      const destPath = path.join(fontDestDir, font);
      fs.copyFileSync(srcPath, destPath);
    });
    console.log("✔ Bootstrap ikon fontları kopyalandı");
  } else {
    console.warn("❌ Bootstrap ikon fontları bulunamadı. 'npm install' yaptığınızdan emin olun.");
  }
}

// include sistemi
function processIncludes(content, baseDir = "src") {
  return content.replace(/<!--\s*include:(.*?)\s*-->/g, (match, filePath) => {
    const fullPath = path.join(baseDir, filePath.trim());

    if (!fs.existsSync(fullPath)) {
      console.warn("❌ Include bulunamadı:", fullPath);
      return "";
    }

    let includedContent = fs.readFileSync(fullPath, "utf8");

    return processIncludes(includedContent, baseDir);
  });
}

// build
function build() {
  copyFonts();
  const files = fs.readdirSync(pagesDir);

  files.forEach(file => {
    if (path.extname(file) === ".html") {
      const filePath = path.join(pagesDir, file);

      let content = fs.readFileSync(filePath, "utf8");
      content = processIncludes(content);

      const outputPath = path.join(distDir, file);

      ensureDir(path.dirname(outputPath));
      fs.writeFileSync(outputPath, content);
    }
  });

  console.log("✔ HTML build edildi");
}

// WATCH
function watch() {
  console.log("👀 HTML izleniyor...");

  fs.watch("src", { recursive: true }, () => {
    build();
  });
}

// CLI
if (process.argv.includes("--watch")) {
  build();
  watch();
} else {
  build();
}