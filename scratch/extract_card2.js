const fs = require('fs');
const svg = fs.readFileSync('./new assets/card 2.svg', 'utf8');
const match = svg.match(/data:image\/png;base64,([^"]+)/);
if (match) {
  fs.writeFileSync('./scratch/card2_extracted.png', Buffer.from(match[1], 'base64'));
  console.log('Saved scratch/card2_extracted.png');
} else {
  console.log('No match');
}
