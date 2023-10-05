import { Radar } from "./radar";

describe('testing construction of Radar class', () => {
  test('Construction requires 4 quadrants', () => {
    expect(() => new Radar([])).toThrow();
  });
});
