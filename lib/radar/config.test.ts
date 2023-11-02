import { quadrantConfig } from "./config";

describe('Quadrant ID to Title', () => {
  test('Correct config returned for existing ID', () => {
    expect(quadrantConfig('platforms')?.title).toBe('Platforms');
  });
  test('Correct undefined returned for non-existant ID', () => {
    expect(quadrantConfig('nonexistant')).toBe(undefined);
  });
});
