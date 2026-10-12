const fs = require('fs');

let text = fs.readFileSync('figma_node.json', 'utf8').replace(/^\uFEFF/, '');
const nodeData = JSON.parse(text);
const home = nodeData.nodes['1:11'].document;

console.log('Home size:', home.absoluteBoundingBox);

// Sort children by Y coordinate
const sortedChildren = [...home.children].sort((a, b) => {
  const ay = a.absoluteBoundingBox ? a.absoluteBoundingBox.y : 0;
  const by = b.absoluteBoundingBox ? b.absoluteBoundingBox.y : 0;
  return ay - by;
});

function summarize(n, depth = 0) {
  const indent = '  '.repeat(depth);
  const bbox = n.absoluteBoundingBox ? `${Math.round(n.absoluteBoundingBox.x)},${Math.round(n.absoluteBoundingBox.y)} ${Math.round(n.absoluteBoundingBox.width)}x${Math.round(n.absoluteBoundingBox.height)}` : 'no-box';
  let extra = '';
  if (n.type === 'TEXT') {
    extra = ` "${n.characters.replace(/\n/g, '\\n').slice(0, 40)}" (${n.style?.fontFamily} ${n.style?.fontSize}px w${n.style?.fontWeight})`;
  }
  return `${indent}- [${n.type}] "${n.name}" id:${n.id} (${bbox})${extra}`;
}

const summaryLines = [];
sortedChildren.forEach(c => {
  summaryLines.push(summarize(c, 0));
  if (c.children && c.children.length < 15) {
    c.children.forEach(sub => summaryLines.push(summarize(sub, 1)));
  } else if (c.children) {
    summaryLines.push(`    (${c.children.length} sub-children)`);
  }
});

fs.writeFileSync('home_elements.txt', summaryLines.join('\n'));
console.log('Saved home_elements.txt with', summaryLines.length, 'entries');
