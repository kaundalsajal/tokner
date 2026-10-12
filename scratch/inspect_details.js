const fs = require('fs');

const tree = JSON.parse(fs.readFileSync('full_tree_inspected.json', 'utf8'));

// 1. Inspect logo nodes
const logo1 = tree.children.find(c => c.name === 'logo_colored_sign_black_text');
console.log('Logo node structure:');
console.log(JSON.stringify(logo1, null, 2));

// 2. Presale cards
const r7 = tree.children.find(c => c.name === 'Rectangle 7');
const r9 = tree.children.find(c => c.name === 'Rectangle 9');
const g20 = tree.children.find(c => c.name === 'Group 20');
console.log('Presale Card 1 Rectangle 7:', JSON.stringify(r7, null, 2));
console.log('Presale Card 3 Rectangle 9:', JSON.stringify(r9, null, 2));
console.log('Presale Card 2 Group 20:', JSON.stringify(g20, null, 2));

// 3. Footer social group 23
const g23 = tree.children.find(c => c.name === 'Group 23');
console.log('Footer social group 23:', JSON.stringify(g23, null, 2));

// 4. "At Tokners are" text fill
const atTok = tree.children.find(c => c.name === 'At Tokners are');
console.log('At Tokners are fills:', JSON.stringify(atTok?.fills, null, 2));

// 5. Presale 01 watermark text fill
const all01 = [];
function find01(n) {
  if (n.characters === '01' || n.characters === '02' || n.characters === '03') {
    all01.push({ text: n.characters, size: n.style?.fontSize, fills: n.fills, box: n.box });
  }
  if (n.children) n.children.forEach(find01);
}
find01(tree);
console.log('Watermark 01/02/03 details:', all01.filter(x => x.size > 50));
