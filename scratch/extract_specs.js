const fs = require('fs');

let text = fs.readFileSync('figma_node.json', 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(text);
const home = data.nodes['1:11'].document;

function rgba(color, opacity = 1) {
  if (!color) return 'none';
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a !== undefined ? +(color.a * opacity).toFixed(2) : opacity;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// 1. Collect all text styles and contents
const texts = [];
const colors = new Set();
const fonts = new Set();

function traverse(node, path = '') {
  const currentPath = path ? `${path} > ${node.name}` : node.name;
  
  if (node.fills) {
    node.fills.forEach(f => {
      if (f.color) colors.add(rgba(f.color, f.opacity));
      if (f.gradientStops) {
        colors.add(`gradient: ${f.type} with ${f.gradientStops.length} stops`);
      }
    });
  }

  if (node.type === 'TEXT') {
    fonts.add(`${node.style?.fontFamily} (${node.style?.fontWeight})`);
    texts.push({
      path: currentPath,
      name: node.name,
      characters: node.characters,
      box: node.absoluteBoundingBox,
      style: node.style,
      fills: node.fills
    });
  }

  if (Array.isArray(node.children)) {
    node.children.forEach(c => traverse(c, currentPath));
  }
}

traverse(home);

console.log('Fonts used:', Array.from(fonts));
console.log('Total text elements:', texts.length);

fs.writeFileSync('texts_detail.json', JSON.stringify(texts, null, 2));

// Also let's inspect the main background color and structure of home
console.log('Home background:', home.backgroundColor, home.fills);
