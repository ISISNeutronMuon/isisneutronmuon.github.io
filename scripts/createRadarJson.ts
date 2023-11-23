// Takes as input the markdown files describing each blip on the radar and
// converts the content to a single JSON-encoded file for use by the client
// radar component.
// This uses the 'fs' package and is intended to be used as a pre-build step.
import { radarToJSON } from "@/lib/radar/io/json";
import { discoverRadars, loadBlipsIntoTable } from "@/lib/radar/io/markdown";
import { BlipTable } from "@/lib/radar/models/blipTable";
import { PreviewVersionId, Radar } from "@/lib/radar/models/radar";
import { writeFileSync } from "fs";
import { basename, join } from "path";

const radarMarkdownDir = join(process.cwd(), 'data', 'radar');
const radarJsonPath = join(process.cwd(), 'public', 'radar.json');

// Takes the content defined as markdown files and converts it to a
// single JSON file for the client-side technology-radar to load
function loadMarkdownAndConvertToJSON() {
  let table = new BlipTable();
  console.log(`Reading radar directories in '${radarMarkdownDir}'`)
  const radarVersions = discoverRadars(radarMarkdownDir);
  console.log(`Found ${radarVersions.length} radar versions`)
  if (radarVersions.length > 0) {
    for (const { dirpath } of radarVersions) {
      console.log(`  Reading ${dirpath}`)
      loadBlipsIntoTable(table, dirpath);
    }
    const latestVersion = radarVersions.at(-1) as { dirpath: string, version: string };
    return radarToJSON(new Radar(latestVersion.version, releaseDate(latestVersion.dirpath), table));
  } else {
    return undefined;
  }
}

function releaseDate(dirpath: string) {
  const dirName = basename(dirpath);
  if (dirName == PreviewVersionId) {
    return new Date();
  } else {
    return new Date(dirName);
  }
}

function writeToJSONFile(jsonString: string) {
  console.log(`Writing final JSON string to '${radarJsonPath}'`)
  writeFileSync(radarJsonPath, jsonString);
}

function main() {
  const radarAsJSON = loadMarkdownAndConvertToJSON();
  if (radarAsJSON)
    writeToJSONFile(radarAsJSON);
  else
    console.log(`${radarJsonPath} not written.`)
}

main();
