const fs = require('fs');
const path = require('path');

const src = 'new assets';
const dest = 'assets';

const files = fs.readdirSync(src);
files.forEach(f => {
  const content = fs.readFileSync(path.join(src, f), 'utf8');
  const cleanName = f.replace(/ /g, '-');
  fs.writeFileSync(path.join(dest, cleanName), content);
  
  const vb = content.match(/viewBox=["']([^"']+)["']/);
  const w = content.match(/width=["']([^"']+)["']/);
  const h = content.match(/height=["']([^"']+)["']/);
  console.log(cleanName, 'w:', w ? w[1] : 'none', 'h:', h ? h[1] : 'none', 'viewBox:', vb ? vb[1] : 'none');
});
