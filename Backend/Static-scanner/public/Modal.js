// accessibility.js

// 1. Inject HTML into the page automatically
document.addEventListener("DOMContentLoaded", () => {
    const widgetHTML = `
      <button class="accessibe-widget-btn" onclick="toggleAccessibilityPanel()">
        <i class="bi bi-universal-access-circle"></i>
      </button>
      <div id="accessPanel" class="access-panel">
        <div class="access-header">
          <h5><i class="bi bi-universal-access-circle me-2"></i> Accessibility Profile</h5>
          <button class="access-close-btn" onclick="toggleAccessibilityPanel()">&times;</button>
        </div>
        <div class="access-body">
          <div class="access-section-title">Color Adjustments</div>
          <div class="access-grid">
            <div class="access-item" onclick="setDarkMode()"><i class="bi bi-moon-stars"></i><span>Dark Mode</span></div>
            <div class="access-item" onclick="setContrastMode()"><i class="bi bi-circle-half"></i><span>Contrast</span></div>
            <div class="access-item" onclick="setGrayscaleMode()"><i class="bi bi-palette"></i><span>Grayscale</span></div>
          </div>
          <div class="access-section-title">Content Adjustments</div>
          <div class="access-grid">
            <div class="access-item" onclick="increaseFont()"><i class="bi bi-zoom-in"></i><span>Font Size +</span></div>
            <div class="access-item" onclick="decreaseFont()"><i class="bi bi-zoom-out"></i><span>Font Size -</span></div>
            <div class="access-item" onclick="toggleHighlightLinks()"><i class="bi bi-link-45deg"></i><span>Highlight Links</span></div>
            <div class="access-item" onclick="setLineSpacing('line-1')"><i class="bi bi-list"></i><span>Line Space 1x</span></div>
            <div class="access-item" onclick="setLineSpacing('line-15')"><i class="bi bi-list"></i><span>Line Space 1.5x</span></div>
            <div class="access-item" onclick="setLineSpacing('line-2')"><i class="bi bi-list"></i><span>Line Space 2x</span></div>
            <div class="access-item" onclick="setLetterSpacing('2px')"><i class="bi bi-arrows-expand"></i><span>Letter Spacing</span></div>
            <div class="access-item" onclick="toggleFocusMode()"><i class="bi bi-bullseye"></i><span>Focus Mode</span></div>
            <div class="access-item" onclick="toggleFontStyle()"><i class="bi bi-fonts"></i><span>Dyslexia Font</span></div>
          </div>
          <div class="access-section-title">Cursor & Zoom</div>
          <div class="access-grid">
            <div class="access-item" onclick="setCursor('black')"><i class="bi bi-cursor-fill text-dark"></i><span>Black Cursor</span></div>
            <div class="access-item" onclick="setCursor('white')"><i class="bi bi-cursor text-secondary"></i><span>White Cursor</span></div>
            <div class="access-item" onclick="toggleMagnifier()"><i class="bi bi-search"></i><span>Magnifier</span></div>
          </div>
          <div class="access-section-title">Orientation</div>
          <div class="access-grid">
            <div class="access-item" onclick="setAlign('left')"><i class="bi bi-text-left"></i><span>Align Left</span></div>
            <div class="access-item" onclick="setAlign('center')"><i class="bi bi-text-center"></i><span>Align Center</span></div>
            <div class="access-item" onclick="setAlign('right')"><i class="bi bi-text-right"></i><span>Align Right</span></div>
          </div>
          <button class="access-reset-btn" onclick="resetAccessibility()"><i class="bi bi-arrow-counterclockwise"></i> Reset All Settings</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
});

// 2. Logic Functions
window.setDarkMode = () => { document.body.classList.remove("contrast-mode", "grayscale-mode"); document.body.classList.toggle("dark-mode"); };
window.setContrastMode = () => { document.body.classList.remove("dark-mode", "grayscale-mode"); document.body.classList.toggle("contrast-mode"); };
window.setGrayscaleMode = () => { document.body.classList.remove("dark-mode", "contrast-mode"); document.body.classList.toggle("grayscale-mode"); };

let fontSize = 100;
window.increaseFont = () => { if(fontSize < 160) { fontSize += 10; document.body.style.fontSize = fontSize + "%"; }};
window.decreaseFont = () => { if(fontSize > 80) { fontSize -= 10; document.body.style.fontSize = fontSize + "%"; }};

let linksHighlighted = false;
window.toggleHighlightLinks = () => {
  linksHighlighted = !linksHighlighted;
  document.querySelectorAll("a:not(.accessibe-widget-btn):not(.access-close-btn)").forEach(link => {
    if (linksHighlighted) { link.style.backgroundColor = "yellow"; link.style.color = "black"; link.style.padding = "2px 4px"; link.style.borderRadius = "4px"; } 
    else { link.style = ""; }
  });
};

window.setAlign = (alignment) => { document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, div:not(.access-panel):not(.access-panel *)").forEach(el => el.style.textAlign = alignment); };
window.setLineSpacing = (type) => { document.body.classList.remove("line-1","line-15","line-2"); document.body.classList.add(type); };
window.setLetterSpacing = (value) => { document.body.style.letterSpacing = value; };
window.toggleFocusMode = () => { document.body.classList.toggle("focus-mode"); };
window.toggleFontStyle = () => { document.body.classList.toggle("dyslexia-font"); };

window.setCursor = (type) => {
  if(type === "black") document.body.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"32\" width=\"32\"><circle cx=\"16\" cy=\"16\" r=\"8\" fill=\"black\"/></svg>') 16 16, auto";
  if(type === "white") document.body.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"32\" width=\"32\"><circle cx=\"16\" cy=\"16\" r=\"8\" fill=\"white\" stroke=\"black\"/></svg>') 16 16, auto";
};

let magnifierActive = false;
window.toggleMagnifier = () => {
  magnifierActive = !magnifierActive;
  magnifierActive ? document.addEventListener("mousemove", magnifyText) : (document.removeEventListener("mousemove", magnifyText), resetMagnifiedText());
};

function magnifyText(e) {
  resetMagnifiedText();
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (!el || el.classList.contains("accessibe-widget-btn") || el.closest(".access-panel")) return;
  el.style.transform = "scale(1.5)"; el.style.transition = "0.1s"; el.style.zIndex = "9999"; el.style.position = "relative";
}

function resetMagnifiedText() { document.querySelectorAll("*").forEach(el => { el.style.transform = ""; el.style.zIndex = ""; }); }

window.toggleAccessibilityPanel = () => { document.getElementById("accessPanel").classList.toggle("open"); };

window.resetAccessibility = () => {
  document.body.classList.remove("dark-mode", "contrast-mode", "grayscale-mode", "focus-mode", "dyslexia-font", "line-1", "line-15", "line-2");
  document.body.style.fontSize = ""; document.body.style.letterSpacing = ""; document.body.style.cursor = "";
  document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, div:not(.access-panel):not(.access-panel *)").forEach(el => el.style.textAlign = "");
  document.querySelectorAll("a").forEach(link => link.style = "");
  fontSize = 100; linksHighlighted = false; magnifierActive = false;
  document.removeEventListener("mousemove", magnifyText); resetMagnifiedText();
};