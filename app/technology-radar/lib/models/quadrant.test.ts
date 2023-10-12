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
  test('Add single blip with expected quadrant succeeds', () => {
    let quadrant = new Quadrant("quadrant");
    quadrant.addBlip(new Blip("name", "quadrant", "title"));

    expect(quadrant.blips.length).toBe(1);
  });
  test('Add single blip with unexpected quadrant throws error', () => {
    let quadrant = new Quadrant('My Quadrant');

    expect(() => {
      quadrant.addBlip(new Blip("name", "wrong quadrant", "ring"))
    }).toThrow();
  });
}
);

describe('Request blips in ring', () => {
  test('Ask for blips with known ring', () => {
    let quadrant = new Quadrant('My Quadrant');
    quadrant.addBlip(new Blip("name1", "My Quadrant", "firstRing"));
    quadrant.addBlip(new Blip("name2", "My Quadrant", "secondRing"));
    quadrant.addBlip(new Blip("name3", "My Quadrant", "firstRing"));

    const blipsInFirst = quadrant.blipsInRing("firstRing");
    expect(blipsInFirst.length).toBe(2);
    expect(blipsInFirst[0].title).toBe('name1');
    expect(blipsInFirst[1].title).toBe('name3');
  });
  test('Ask for blips with unknown ring', () => {
    let quadrant = new Quadrant('My Quadrant');
    quadrant.addBlip(new Blip("name1", "My Quadrant", "firstRing"));
    quadrant.addBlip(new Blip("name2", "My Quadrant", "secondRing"));
    quadrant.addBlip(new Blip("name3", "My Quadrant", "firstRing"));

    const blipsInFirst = quadrant.blipsInRing("unknownRing");
    expect(blipsInFirst.length).toBe(0);
  });
}
);
