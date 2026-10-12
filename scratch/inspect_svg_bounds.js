const fs = require('fs');

['hero-layer-1.svg', 'hero-layer-2.svg', 'hero-layer-3.svg', 'purple-1.svg', 'purple-2.svg', 'second-card-section-background.svg'].forEach(f => {
  const content = fs.readFileSync('./assets/' + f, 'utf8');
  const dMatches = content.match(/d="([^"]+)"/g) || [];
  console.log('=== ' + f + ' ===');
  const svgMatch = content.match(/<svg width="([^"]+)" height="([^"]+)" viewBox="([^"]+)"/);
  if (svgMatch) {
    console.log('SVG:', svgMatch[1], svgMatch[2], 'viewBox:', svgMatch[3]);
  }
  dMatches.forEach((dStr, idx) => {
    const raw = dStr.replace(/^d="/, '').replace(/"$/, '');
    const nums = raw.match(/-?[\d\.]+/g).map(Number);
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < nums.length; i += 2) {
      const x = nums[i];
      const y = nums[i+1];
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    console.log('Path ' + idx + ' bounds:', {minX, maxX, minY, maxY, w: maxX - minX, h: maxY - minY});
  });
});
