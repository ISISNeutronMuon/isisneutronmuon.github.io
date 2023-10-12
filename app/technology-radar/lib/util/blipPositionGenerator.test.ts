import { BlipPositionGenerator } from "./blipPositionGenerator";

describe('Blip position calculator constructor', () => {
  test('Exception rasied if (innerRadius > outerRadius)', () => {
    expect(() => new BlipPositionGenerator({ x: 1, y: 1 }, 0.5, 0.25, 1.)).toThrow()
  });
  test('Exception rasied if (innerRadius == outerRadius)', () => {
    expect(() => new BlipPositionGenerator({ x: 1, y: 1 }, 0.5, 0.5, 1.)).toThrow()
  });
});


describe('Blip position generation', () => {
  it.each([
    { x: -1, y: -1 }, // top-left
    { x: 1, y: -1 }, // top-right
    { x: 1, y: 1 }, // bottom-right
    { x: -1, y: 1 }, // bottom-left
  ])('Test generate in %o radial basis', (radialBasis) => {
    const innerRadius = 0.5, outerRadius = 1.0;
    const gen = new BlipPositionGenerator(radialBasis, innerRadius, outerRadius, 0.1);
    const centre = gen.generateCentres(1);
    expect(centre.length).toBe(1);

    const pos = centre[0];
    const r = Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2));
    expect((r > innerRadius && r < outerRadius)).toBe(true);
    expect(Math.sign(pos.x)).toEqual(Math.sign(radialBasis.x));
    expect(Math.sign(pos.y)).toEqual(Math.sign(radialBasis.y));
  });
});
