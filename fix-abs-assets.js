const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Replace absolute /assets/ with relative assets/
    const updated = content.replace(/\"\/assets\//g, '"assets/');
    if (updated !== content) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log('Updated:', filePath);
    }
  } catch (e) {
    console.error('Error:', filePath, e.message);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry)) {
      replaceInFile(full);
    }
  }
}

walk(path.join(__dirname, 'src'));
console.log('Done.');