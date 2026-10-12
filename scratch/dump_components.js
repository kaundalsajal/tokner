const fs = require('fs');

const tree = JSON.parse(fs.readFileSync('full_tree_inspected.json', 'utf8'));

// 1. Logo
console.log('=== LOGO (1:26) ===');
const logo = tree.children.find(c => c.name === 'logo_colored_sign_black_text');
console.log(JSON.stringify(logo, null, 2));

// 2. Buttons
console.log('\n=== BUTTONS ===');
const btn1 = tree.children.find(c => c.name === 'Rectangle 2');
const btn1Text = tree.children.find(c => c.name === 'Sign Up');
console.log('Sign Up Button:', btn1, btn1Text);

const group2 = tree.children.find(c => c.name === 'Group 2');
console.log('Learn More Button (Group 2):', JSON.stringify(group2, null, 2));

// 3. Cards: Group 10 and Group 11
console.log('\n=== CARD 01 (Group 10 - For Creators) ===');
const g10 = tree.children.find(c => c.name === 'Group 10');
console.log(JSON.stringify(g10, null, 2).slice(0, 2000));

console.log('\n=== CARD 02 (Group 11 - For Hodlers) ===');
const g11 = tree.children.find(c => c.name === 'Group 11');
console.log(JSON.stringify(g11, null, 2).slice(0, 2000));

// 4. Background shapes
console.log('\n=== BACKGROUND VECTORS ===');
const bgVectors = tree.children.filter(c => c.type === 'VECTOR' || c.name.startsWith('Vector') || c.name === 'Subtract');
bgVectors.forEach(v => {
  console.log(`- ${v.name} (${v.id}): box: ${v.box ? `${v.box.x},${v.box.y} ${v.box.width}x${v.box.height}` : 'none'}, fills:`, JSON.stringify(v.fills));
});
