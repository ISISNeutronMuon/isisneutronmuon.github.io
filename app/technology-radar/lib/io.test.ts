import { loadRadarContent } from './io';

describe('Radar IO tests', () => {
  test('Expected 4 qudrants', () => {
    expect(loadRadarContent().quadrants.size).toBe(4)
  });
});
