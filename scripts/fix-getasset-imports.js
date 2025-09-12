const fs = require('fs');
const path = require('path');

const projectRoot = __dirname.replace(/\\scripts$/, '');
const srcRoot = path.join(projectRoot, 'src');
const utilsFileAbs = path.join(srcRoot, 'utils', 'assetPath.ts');

function listFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files = files.concat(listFiles(fullPath));
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) files.push(fullPath);
  }
  return files;
}

function normalizeRel(from, toNoExt) {
  let rel = path.relative(from, toNoExt).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel;
}

function fixFile(filePath) {
  // Do not touch the assetPath module itself
  if (path.resolve(filePath) === path.resolve(utilsFileAbs)) return false;

  const original = fs.readFileSync(filePath, 'utf8');
  const lines = original.split(/\r?\n/);
  let changed = false;

  const getAssetImportLineRe = /^\s*import\s*\{\s*getAssetPath\s*\}\s*from\s*['"][^'"]*assetPath['"];?\s*$/;
  const importBlockStartRe = /^\s*import\s*\{/; // begins with: import {
  const importBlockEndRe = /\}\s*from\s*['"][^'"]+['"];?\s*$/;

  // 1) Drop any existing getAssetPath import lines anywhere
  let stripped = [];
  for (const line of lines) {
    if (getAssetImportLineRe.test(line)) {
      changed = true;
      continue;
    }
    stripped.push(line);
  }

  // 2) Remove getAssetPath lines incorrectly placed within a multi-line import block (defensive)
  const cleaned = [];
  for (let i = 0; i < stripped.length; i++) {
    const line = stripped[i];
    if (importBlockStartRe.test(line) && !importBlockEndRe.test(line)) {
      const block = [line];
      let j = i + 1;
      while (j < stripped.length && !importBlockEndRe.test(stripped[j])) {
        if (getAssetImportLineRe.test(stripped[j])) {
          changed = true; // drop it
        } else {
          block.push(stripped[j]);
        }
        j++;
      }
      if (j < stripped.length) block.push(stripped[j]);
      cleaned.push(...block);
      i = j;
      continue;
    }
    cleaned.push(line);
  }

  // 3) If the file uses getAssetPath(, insert a safe import at the very top of the file
  const fileText = cleaned.join('\n');
  const usesGetAssetPath = fileText.includes('getAssetPath(');

  if (usesGetAssetPath) {
    // Compute correct relative path to src/utils/assetPath (module path without extension)
    const relDir = path.dirname(filePath);
    const utilsModuleNoExt = path.join(srcRoot, 'utils', 'assetPath');
    const relPath = normalizeRel(relDir, utilsModuleNoExt);
    const importStmt = `import { getAssetPath } from "${relPath}";`;

    // Avoid duplicate insertion
    if (!cleaned.some(l => getAssetImportLineRe.test(l))) {
      cleaned.unshift(importStmt);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, cleaned.join('\n'), 'utf8');
    return true;
  }
  return false;
}

function run() {
  const files = listFiles(srcRoot);
  let fixed = 0;
  for (const fp of files) {
    try {
      if (fixFile(fp)) {
        console.log('Fixed:', path.relative(projectRoot, fp));
        fixed++;
      }
    } catch (e) {
      console.error('Error fixing', fp, e.message);
    }
  }
  console.log(`\nDone. Files modified: ${fixed}`);
}

run();
