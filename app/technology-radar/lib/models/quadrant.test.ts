import { Quadrant } from "./quadrant";

describe('Quadrant construction tests', () => {
  test('Default construction should contain no blips', () => {
    expect(new Quadrant("Title").blips.length).toBe(0);
  });
  test('Default construction should throw on empty title', () => {
    expect(() => new Quadrant("")).toThrow();
  });
});
