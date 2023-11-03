import { readFileSync, readdirSync, PathLike } from "fs";
import { basename, join } from "path";
import { readMarkdownWithFrontmatter } from "@/lib/markdown";

import { BlipTable } from "../models/blipTable";

const BLIP_FILE_EXT = '.md';

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

// Given a directory, find the radar directories and assign them versions
export function discoverRadars(radarRoot: string): { dirpath: string; version: string; }[] {
  // Final list is sorted with earliest first
  const radarDirnames = readdirSync(radarRoot, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());
  radarDirnames.sort((a, b) => new Date(a.name).valueOf() - new Date(b.name).valueOf());

  return radarDirnames.map((dirent, index) => {
    return { dirpath: join(dirent.path, dirent.name), version: (index + 1).toString(), }
  });
}

// Load the blips from a given directory into the table, merging any that
// have been loaded already. Returns the input table,
export function loadBlipsIntoTable(table: BlipTable, dirpath: string): BlipTable {
  const blipFiles = readdirSync(dirpath);
  for (const blipFile of blipFiles) {
    loadBlipIntoTable(table, join(dirpath, blipFile));
  }

  return table;
}

// Given a path to a markdown file, load the content as a Blip
export function loadBlipIntoTable(table: BlipTable, filepath: string) {
  let toBlipRef = (filename: string) => basename(filename, BLIP_FILE_EXT);

  const { frontmatter, body } = readMarkdownWithFrontmatter(readFileSync(filepath, 'utf8'));
  table.appendBlip(toBlipRef(filepath), frontmatter.title, frontmatter.quadrant, frontmatter.ring, body);
}
