const fs = require('fs');

const tree = JSON.parse(fs.readFileSync('full_tree_inspected.json', 'utf8'));

// Print all text elements with their positions and styling
const allTexts = [];
function collectText(node) {
  if (node.type === 'TEXT') {
    allTexts.push({
      text: node.characters,
      box: node.box,
      style: node.style,
      color: node.fills?.[0]?.color || node.fills?.[0]?.rgba,
      name: node.name
    });
  }
  if (node.children) node.children.forEach(collectText);
}
collectText(tree);

// Sort texts by Y coordinate
allTexts.sort((a, b) => a.box.y - b.box.y);

console.log('Total texts:', allTexts.length);
fs.writeFileSync('all_texts_ordered.json', JSON.stringify(allTexts, null, 2));

// Let's print out text groups by vertical ranges
const sections = [
  { name: 'Navbar & Hero', startY: 0, endY: 900 },
  { name: 'Cards (Creators & Hodlers)', startY: 900, endY: 2000 },
  { name: 'What Makes Us Different', startY: 2000, endY: 2600 },
  { name: 'Roadmap (Q1 - Q4 2021)', startY: 2600, endY: 3400 },
  { name: 'Tokners Features / Middle Section', startY: 3400, endY: 4800 },
  { name: 'Presale Details (Phases 1-3)', startY: 4800, endY: 5650 },
  { name: 'How to buy', startY: 5650, endY: 6050 },
  { name: 'Footer', startY: 6050, endY: 6700 },
];

sections.forEach(sec => {
  console.log(`\n================== ${sec.name} (${sec.startY} - ${sec.endY}) ==================`);
  const secTexts = allTexts.filter(t => t.box.y >= sec.startY && t.box.y < sec.endY);
  secTexts.forEach(t => {
    console.log(`[y:${Math.round(t.box.y)}, x:${Math.round(t.box.x)}, w:${Math.round(t.box.width)}] "${t.text.replace(/\n/g, ' ')}" -> ${t.style?.fontSize}px / w${t.style?.fontWeight} / ${t.color}`);
  });
});
