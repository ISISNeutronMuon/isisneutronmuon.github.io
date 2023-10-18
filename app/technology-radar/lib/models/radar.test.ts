import { BlipTable } from "./blipTable";
import { Radar } from "./radar";

// Use the development mode of loadBlipContent
import { loadBlipContent } from "../io";

describe('testing construction of Radar class', () => {
  test('Construction allows empty blip data table', () => {
    const radar = new Radar(new BlipTable());
    expect(radar.quadrants().size).toBe(0);
  });
});

describe('testing Radar quadrants accessor ', () => {
  test('Each quadrant contains only those blips assigned to it', () => {
    const radar = new Radar(loadBlipContent(true));
    const quadrants = radar.quadrants();
    expect(quadrants.size).toBe(4);
    quadrants.forEach((quadrant) => {
      for (let blip of quadrant.blips) {
        expect(blip.quadrantTitle).toBe(quadrant.title);
      }
    });
  });
});
