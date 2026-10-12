const fs = require('fs');
const https = require('https');
const path = require('path');

let fillsText = fs.readFileSync('image_fills.json', 'utf8').replace(/^\uFEFF/, '');
const fills = JSON.parse(fillsText);
const images = fills.meta.images;

if (!fs.existsSync('all_assets')) fs.mkdirSync('all_assets');

const entries = Object.entries(images);
let count = 0;
entries.forEach(([ref, url]) => {
  const filename = path.join('all_assets', `img_${ref.slice(0, 8)}.png`);
  if (!fs.existsSync(filename)) {
    https.get(url, res => {
      const s = fs.createWriteStream(filename);
      res.pipe(s);
      s.on('finish', () => {
        count++;
        if (count === entries.length) console.log('All images downloaded!');
      });
    });
  }
});
console.log('Downloading', entries.length, 'images to all_assets/');
