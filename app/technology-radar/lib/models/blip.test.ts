import { Blip } from './blip';

describe('Blip construction tests', () => {
  test('A blip must have a non-empty title string', () => {
    expect(() => new Blip('')).toThrow();
  });
});
