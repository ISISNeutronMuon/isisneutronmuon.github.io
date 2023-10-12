import { Blip } from "./blip";
import { Quadrant } from "./quadrant";

describe('Quadrant construction tests', () => {
  test('Default construction should contain no blips', () => {
    expect(new Quadrant("Title").blips.length).toBe(0);
  });
  test('Default construction should throw on empty title', () => {
    expect(() => new Quadrant("")).toThrow();
  });
});

describe('Adding blips', () => {
  test('Add single blip with expected category succeeds', () => {
    let quadrant = new Quadrant("category");
    quadrant.addBlip(new Blip("name", "category", "title"));

    expect(quadrant.blips.length).toBe(1);
  });
  test('Add single blip with unexpected category throws error', () => {
    let quadrant = new Quadrant('My Quadrant');

    expect(() => {
      quadrant.addBlip(new Blip("name", "wrong category", "ring"))
    }).toThrow();
  });
}
);
