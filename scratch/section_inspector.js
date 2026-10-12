const fs = require('fs');

let text = fs.readFileSync('figma_node.json', 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(text);
const home = data.nodes['1:11'].document;

function rgba(color, opacity = 1) {
  if (!color) return 'transparent';
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a !== undefined ? +(color.a * opacity).toFixed(2) : opacity;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function hex(color) {
  if (!color) return 'transparent';
  const r = Math.round(color.r * 255).toString(16).padStart(2, '0');
  const g = Math.round(color.g * 255).toString(16).padStart(2, '0');
  const b = Math.round(color.b * 255).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

function inspectNode(n, depth = 0) {
  const info = {
    id: n.id,
    name: n.name,
    type: n.type,
    box: n.absoluteBoundingBox,
    fills: Array.isArray(n.fills) ? n.fills.map(f => {
      if (f.type === 'SOLID') return { type: 'SOLID', color: hex(f.color), rgba: rgba(f.color, f.opacity) };
      if (f.type?.includes('GRADIENT')) return { type: f.type, stops: f.gradientStops?.map(s => ({ pos: s.position, color: rgba(s.color) })) };
      if (f.type === 'IMAGE') return { type: 'IMAGE', imageRef: f.imageRef };
      return f.type;
    }) : undefined,
    strokes: Array.isArray(n.strokes) ? n.strokes.map(s => s.color ? hex(s.color) : s.type) : undefined,
    strokeWeight: n.strokeWeight,
    cornerRadius: n.cornerRadius,
    rectangleCornerRadii: n.rectangleCornerRadii,
    effects: Array.isArray(n.effects) ? n.effects.map(e => ({ type: e.type, radius: e.radius, offset: e.offset, color: e.color ? rgba(e.color) : null })) : undefined,
    style: n.style ? {
      fontFamily: n.style.fontFamily,
      fontSize: n.style.fontSize,
      fontWeight: n.style.fontWeight,
      letterSpacing: n.style.letterSpacing,
      lineHeightPx: n.style.lineHeightPx,
      textAlignHorizontal: n.style.textAlignHorizontal
    } : undefined,
    characters: n.characters
  };

  if (Array.isArray(n.children)) {
    info.children = n.children.map(c => inspectNode(c, depth + 1));
  }
  return info;
}

const tree = inspectNode(home);
fs.writeFileSync('full_tree_inspected.json', JSON.stringify(tree, null, 2));
console.log('Tree inspected and saved to full_tree_inspected.json');
