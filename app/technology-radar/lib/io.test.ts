import { loadAllBlips } from './io';

describe('IO tests', () => {
  test('All test blips loaded', () => {
    expect(loadAllBlips(true).size).toBe(18);
  });
});
