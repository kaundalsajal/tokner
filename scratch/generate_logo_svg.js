const fs = require('fs');

// The Tokners logo consists of 4 diagonal capsule bars:
// Bar 1: Gradient blue #6275F6 to cyan #82E8FE
// Bar 2: Gradient purple #8C31A2 to magenta #BF1B66
// Bar 3: Gradient crimson #C31A62 to red #EF0820
// Bar 4: Gradient yellow #F8E64C to coral #EB3E49
// Angle: ~ -45 degrees or 45 degrees diagonal pills
// And the word "tokners" in bold rounded sans-serif

function createLogoSvg(textColor = '#191B21') {
  return `<svg width="220" height="40" viewBox="0 0 220 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1_${textColor.replace('#','')}" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#6275F6" />
      <stop offset="100%" stop-color="#82E8FE" />
    </linearGradient>
    <linearGradient id="grad2_${textColor.replace('#','')}" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#8C31A2" />
      <stop offset="100%" stop-color="#BF1B66" />
    </linearGradient>
    <linearGradient id="grad3_${textColor.replace('#','')}" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#C31A62" />
      <stop offset="100%" stop-color="#EF0820" />
    </linearGradient>
    <linearGradient id="grad4_${textColor.replace('#','')}" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#EB3E49" />
      <stop offset="100%" stop-color="#F8E64C" />
    </linearGradient>
  </defs>
  <!-- 4 diagonal rounded capsules -->
  <g transform="translate(0, 2)">
    <!-- Capsule 1 -->
    <rect x="0" y="14" width="9.5" height="22" rx="4.75" transform="rotate(-28 0 14)" fill="url(#grad1_${textColor.replace('#','')})" />
    <!-- Capsule 2 -->
    <rect x="13" y="8" width="9.5" height="27" rx="4.75" transform="rotate(-28 13 8)" fill="url(#grad2_${textColor.replace('#','')})" />
    <!-- Capsule 3 -->
    <rect x="26" y="8" width="9.5" height="27" rx="4.75" transform="rotate(-28 26 8)" fill="url(#grad3_${textColor.replace('#','')})" />
    <!-- Capsule 4 -->
    <rect x="39" y="2" width="9.5" height="33" rx="4.75" transform="rotate(-28 39 2)" fill="url(#grad4_${textColor.replace('#','')})" />
  </g>
  <!-- Tokners wordmark -->
  <text x="68" y="27" fill="${textColor}" font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="800" letter-spacing="-0.5px">tokners</text>
</svg>`;
}

fs.writeFileSync('assets/logo.svg', createLogoSvg('#191B21'));
fs.writeFileSync('assets/logo-white.svg', createLogoSvg('#FFFFFF'));

// Also create logo icon only (for 'What makes us different')
function createLogoIconSvg() {
  return `<svg width="55" height="36" viewBox="0 0 55 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="icon_grad1" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#6275F6" />
      <stop offset="100%" stop-color="#82E8FE" />
    </linearGradient>
    <linearGradient id="icon_grad2" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#8C31A2" />
      <stop offset="100%" stop-color="#BF1B66" />
    </linearGradient>
    <linearGradient id="icon_grad3" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#C31A62" />
      <stop offset="100%" stop-color="#EF0820" />
    </linearGradient>
    <linearGradient id="icon_grad4" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#EB3E49" />
      <stop offset="100%" stop-color="#F8E64C" />
    </linearGradient>
  </defs>
  <g transform="translate(0, 1)">
    <rect x="0" y="14" width="9.5" height="22" rx="4.75" transform="rotate(-28 0 14)" fill="url(#icon_grad1)" />
    <rect x="13" y="8" width="9.5" height="27" rx="4.75" transform="rotate(-28 13 8)" fill="url(#icon_grad2)" />
    <rect x="26" y="8" width="9.5" height="27" rx="4.75" transform="rotate(-28 26 8)" fill="url(#icon_grad3)" />
    <rect x="39" y="2" width="9.5" height="33" rx="4.75" transform="rotate(-28 39 2)" fill="url(#icon_grad4)" />
  </g>
</svg>`;
}

fs.writeFileSync('assets/logo-icon.svg', createLogoIconSvg());
console.log('Generated logo.svg, logo-white.svg, logo-icon.svg');
