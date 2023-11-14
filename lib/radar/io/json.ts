import { BlipTable } from "../models/blipTable";
import { Radar } from "../models/radar";

// Serialize a Radar as a JSON string
// {
//   version: string,
//   releaseDate: string,
//   blips: [
//     {
//       id: number,
//       refName: string,
//       title: string,
//       quadrantId: string,
//       ring: string,
//       description: string,
//     }, ...
//   ]
// }
export function radarToJSON(radar: Radar): string {
  return JSON.stringify({
    version: radar.version,
    releaseDate: radar.releaseDate,
    blips: _toObjectList(radar.blips)
  })
}

export function jsonToRadar(jsonObject: any): Radar {
  return new Radar(jsonObject.version, jsonObject.releaseDate, _fromObjectList(jsonObject.blips));
}


// Take the table of blips and serialize it as a list of objects
function _toObjectList(table: BlipTable): any[] {
  return table.map((blip) => blip.toObject());
}

// Take a list of objects with Blip properties and construct a BlipTable
// out of them
function _fromObjectList(blips: any[]): BlipTable {
  return new BlipTable(blips);
}
