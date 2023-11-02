import { basename, join } from "path";
import { readMarkdownWithFrontmatter } from "@/lib/markdown";

import { BlipTable } from "./models/blipTable";
import { Radar } from "./models/radar";

export const RADAR_DATA_ROOT = join(process.cwd(), 'data', 'radar')
const BLIP_FILE_EXT = '.md';


// Load all blips as a flat table
export function loadAllBlips(development: boolean): BlipTable {
  return new BlipTable();
}

// Load blips for a given quadrant
export function loadBlipsByQuadrant(quadrantId: string, development: boolean): BlipTable {
  return loadAllBlips(development).filterByQuadrant(quadrantId);
}

// A radar version is a separate directory, named using the release date of
// the radar in the format YYYY-MM-DD, containing a series of markdown files.
// Each markdown file should be named as a lowercase string that defines the
// id string of the blip, where spaces are replaced by a dash ("-"). This id
// is to form the trailing part of the URL describing the blip, e.g. a file named
// new-cool-tech.md would have a URL describing the blip ending in /new-cool-tech.
//
// An existing blip md file should only be added to a later directory if there is
// a change in the content.
//
// Each markdown file is expected to contain a frontmatter section formatted
// as YAML followed by a description of the blip in the body. The frontmatter
// is expected to contain the following attributes:
//
//   - title: A string title for the blip, can contain spaces
//   - quadrant: A string describing the quadrant (see config.ts for options)
//   - ring: A string describing the ring (see config.ts for options)
//
// The radar version return is the most recent
export function loadRadarContent(radar_dir: string): Radar {
  const radarVersions = discoverRadars(radar_dir);
  const blipTable = new BlipTable();
  for (let { direc } of radarVersions) {
    loadBlipsIntoTable(blipTable, join(direc.path, direc.name));
  }
  const latestVersion = radarVersions[radarVersions.length - 1];
  return new Radar(latestVersion.version, latestVersion.direc.name, blipTable);
}

// Given a directory, find the radar directories and assign them versions
export function discoverRadars(radarRoot: string) {
  // Final list is sorted with earliest first
  const radarDirnames = fs.readdirSync(radarRoot, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());
  radarDirnames.sort((a, b) => new Date(a.name).valueOf() - new Date(b.name).valueOf());

  return radarDirnames.map((dirent, index) => {
    return { direc: dirent, version: (index + 1).toString(), }
  });
}

// Load the blips from a given directory
export function loadBlipsIntoTable(table: BlipTable, path: string) {
  const blipFiles = fs.readdirSync(path, { withFileTypes: true });
  for (const blipFile of blipFiles) {
    loadBlip(table, blipFile);
  }
  return table;
}

// Given a path to a markdown file, load the content as a Blip
export function loadBlip(table: BlipTable, path: fs.Dirent) {
  let toBlipRef = (filename: string) => basename(filename, BLIP_FILE_EXT);

  const { frontmatter, body } = readMarkdownWithFrontmatter(fs.readFileSync(join(path.path, path.name), 'utf8'));
  table.appendBlip(toBlipRef(path.name), frontmatter.title, frontmatter.quadrant, frontmatter.ring, body);
}
