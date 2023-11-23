import { fakeBlipTable } from "../util/testing/fakeBlipTable";
import { Radar } from "./radar";

describe('Radar contruction', () => {
  test('Accessor properties return expected content', () => {
    const blips = fakeBlipTable(4);
    const radar = new Radar("2", new Date("2023-10-31"), blips);

    expect(radar.version).toEqual("2");
    // The Date constructor takes a month index that starts from 0...
    expect(radar.releaseDate).toEqual(new Date(2023, 9, 31));
    expect(radar.blips).toStrictEqual(blips);
  })
});
