import { jsonToRadar, radarToJSON } from "./json";
import { fakeBlipTable } from "../util/testing/fakeBlipTable";
import { Radar } from "../models/radar";

const jsonTestStringEmptyBlips = `
{
  "version": "3",
  "releaseDate": "2023-11-02T00:00:00.000Z",
  "blips": []
}
`
const jsonTestStringWithBlips = `
{
  "version": "3",
  "releaseDate": "2023-11-02T00:00:00.000Z",
  "blips": [
    {
      "id": 1,
      "refName": "refname-1",
      "title": "title 1",
      "quadrantId": "quadrant-1",
      "ring": "ring-1",
      "description": "My description 1",
      "comments": "My comments 1"
    },
    {
      "id": 2,
      "refName": "refname-2",
      "title": "title 2",
      "quadrantId": "quadrant-2",
      "ring": "ring-2",
      "description": "My description 2",
      "comments": "My comments 2"
    }
  ]
}
`

describe('jsonToRadar', () => {
  test('An string with empty blip array is accepted', () => {
    const radar = jsonToRadar(JSON.parse(jsonTestStringEmptyBlips));

    expect(radar.version).toBe("3");
    expect(radar.releaseDate).toEqual(new Date("2023-11-02T00:00:00.000Z"));
    expect(radar.blips.size).toEqual(0);
  })
  test('An string with non-empty blip array is accepted', () => {
    const radar = jsonToRadar(JSON.parse(jsonTestStringWithBlips));

    expect(radar.version).toBe("3");
    expect(radar.releaseDate).toEqual(new Date("2023-11-02T00:00:00.000Z"));
    expect(radar.blips.size).toEqual(2);
  })
});

test('radarToJSON', () => {
  const version = "2", date = new Date("2023-11-06");
  const radar = new Radar(version, date, fakeBlipTable(2));

  const jsonString = radarToJSON(radar);

  const jsonObject = JSON.parse(jsonString);
  expect(jsonObject.version).toBe(version);
  expect(jsonObject.releaseDate).toEqual(date.toISOString());
  expect(jsonObject.blips[0]["id"]).toEqual(1);
  expect(jsonObject.blips[1]["id"]).toEqual(2);
});
