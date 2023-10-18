import { Blip } from "./blip";
import { Quadrant } from "./quadrant";

describe('Quadrant construction tests', () => {
  test('Default construction should contain no blips', () => {
    expect(new Quadrant("Title").blips.length).toBe(0);
  });
  test('Default construction should throw on empty title', () => {
    expect(() => new Quadrant("")).toThrow();
  });
  test('Construction with blips saves blips as initial set', () => {
    const initialBlips = [
      new Blip(1, "name1", "quadrant", "ring"),
      new Blip(2, "name2", "quadrant", "ring")];
    const quadrant = new Quadrant("Title", initialBlips);
    for (let blip of initialBlips) {
      expect(quadrant.blips.includes(blip)).toBe(true);
    }
  });
});

describe('Adding blips', () => {
  test('Add single blip with expected quadrant succeeds', () => {
    let quadrant = new Quadrant("quadrant");
    quadrant.addBlip(new Blip(1, "name", "quadrant", "title"));

    expect(quadrant.blips.length).toBe(1);
  });
  test('Add single blip with unexpected quadrant throws error', () => {
    let quadrant = new Quadrant('My Quadrant');

    expect(() => {
      quadrant.addBlip(new Blip(1, "name", "wrong quadrant", "ring"))
    }).toThrow();
  });
}
);

describe('Request blips in ring', () => {
  test('Ask for blips with known ring', () => {
    let quadrant = new Quadrant('My Quadrant');
    quadrant.addBlip(new Blip(1, "name1", "My Quadrant", "firstRing"));
    quadrant.addBlip(new Blip(2, "name2", "My Quadrant", "secondRing"));
    quadrant.addBlip(new Blip(3, "name3", "My Quadrant", "firstRing"));

    const blipsInFirst = quadrant.blipsInRing("firstRing");
    expect(blipsInFirst.length).toBe(2);
    expect(blipsInFirst[0].title).toBe('name1');
    expect(blipsInFirst[1].title).toBe('name3');
  });
  test('Ask for blips with unknown ring', () => {
    let quadrant = new Quadrant('My Quadrant');
    quadrant.addBlip(new Blip(1, "name1", "My Quadrant", "firstRing"));
    quadrant.addBlip(new Blip(2, "name2", "My Quadrant", "secondRing"));
    quadrant.addBlip(new Blip(3, "name3", "My Quadrant", "firstRing"));

    const blipsInFirst = quadrant.blipsInRing("unknownRing");
    expect(blipsInFirst.length).toBe(0);
  });
}
);
