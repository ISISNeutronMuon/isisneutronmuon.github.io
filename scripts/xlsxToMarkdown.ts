import { basename, join } from 'path';
import * as fs from 'fs';
import * as XLSX from 'xlsx';
/* set 'fs' for readFile and writeFile support */
XLSX.set_fs(fs);

const MD_EXT = '.md'

function xlsxToMarkdown(infilePath: string, outDirPath: string) {
  console.log(`Converting ${xlsxPath} to separate markdown files in ${outDirPath}`);

  const workbook = XLSX.readFile(infilePath);
  const blipsSheet = workbook.Sheets[workbook.SheetNames[0]];
  const blipsData = XLSX.utils.sheet_to_json(blipsSheet);
  fs.mkdirSync(outDirPath);
  blipsData.forEach((blip: any) => writeMarkdownFile(outDirPath, blip))
}

function writeMarkdownFile(outDirPath: string, blip: any) {
  const blipTitle = blip['Name'];
  const quadrantId = toQuadrantId(blip['Quadrant']);
  const ringId = blip['Agreed Ring'] ? toRingId(blip['Agreed Ring']) : 'BLANK';
  const website = blip['Website'];

  const mdContent = `---
title: ${blipTitle}
quadrant: ${quadrantId}
ring: ${ringId}
---

[${blipTitle}](${website})
`;

  const mdFilePath = join(outDirPath, blipFilename(blipTitle));
  fs.writeFileSync(mdFilePath, mdContent);
  console.log(`  Written ${mdFilePath}`);
}

// Return a sanitized filename for given a blipname
function blipFilename(name: string) {
  return name
    .toLowerCase()
    .replaceAll(' ', '-')
    .replace(/^\./, 'dot')
    .replaceAll('++', 'pp') + MD_EXT
}

function toQuadrantId(quadrantTitle: string) {
  switch (quadrantTitle) {
    case 'Languages & Frameworks':
      return 'languages-and-frameworks';
    case 'Tools':
      return 'tools';
    case 'Platforms':
      return 'platforms';
    case 'Techniques':
      return 'techniques';
  }
}

function toRingId(ringTitle: string) {
  return ringTitle.toLowerCase()
}

// ---------- Main ---------
if (process.argv.length != 4) {
  console.log(`Usage:\n  ${basename(process.argv[1])} xlsxPath markdownDir`);
  process.exit(1);
}
const xlsxPath = process.argv[2];
const outDirPath = process.argv[3];
// if (fs.existsSync(outDirPath)) {
//   console.log(`Output directory '${outDirPath}' exists.`);
//   console.log('Remove the directory first and re-run the script.')
// }

xlsxToMarkdown(xlsxPath, outDirPath);
