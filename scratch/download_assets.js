const fs = require('fs');
const https = require('https');
const path = require('path');

let text = fs.readFileSync('figma_node.json', 'utf8').replace(/^\uFEFF/, '');
const nodeData = JSON.parse(text);
let fillsText = fs.readFileSync('image_fills.json', 'utf8').replace(/^\uFEFF/, '');
const fillsData = JSON.parse(fillsText);
const imageMap = fillsData.meta?.images || {};

if (!fs.existsSync('assets')) fs.mkdirSync('assets');

const imageNodes = [];
function walk(node) {
  if (node.fills) {
    node.fills.forEach(f => {
      if (f.type === 'IMAGE' && f.imageRef) {
        imageNodes.push({
          name: node.name,
          id: node.id,
          imageRef: f.imageRef,
          scaleMode: f.scaleMode,
          box: node.absoluteBoundingBox
        });
      }
    });
  }
  if (Array.isArray(node.children)) {
    node.children.forEach(walk);
  }
}

walk(nodeData.nodes['1:11'].document);
console.log('Found image nodes count:', imageNodes.length);

const downloadTasks = [];
const seenRefs = new Set();

imageNodes.forEach((item) => {
  const url = imageMap[item.imageRef];
  if (!url) {
    console.log('No URL for imageRef:', item.imageRef);
    return;
  }
  const cleanName = item.name.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = path.join('assets', `${cleanName}_${item.imageRef.slice(0, 8)}.png`);
  item.localFile = filename;
  
  if (!seenRefs.has(item.imageRef)) {
    seenRefs.add(item.imageRef);
    downloadTasks.push({ url, filename, name: item.name });
  }
});

fs.writeFileSync('image_nodes.json', JSON.stringify(imageNodes, null, 2));

console.log('Unique images to download:', downloadTasks.length);

let completed = 0;
downloadTasks.forEach(task => {
  https.get(task.url, res => {
    const fileStream = fs.createWriteStream(task.filename);
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      completed++;
      console.log(`Downloaded (${completed}/${downloadTasks.length}): ${task.filename}`);
    });
  }).on('error', err => console.error('Error downloading:', err));
});
