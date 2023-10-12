import { Blip } from './blip';

describe('Blip construction tests', () => {
  it.each([
    ['', '', ''],
    ['', 'quadrant', 'ring'],
    ['title', '', 'ring'],
    ['title', 'quadrant', ''],
  ])
    ("with attribute strings ('%s', '%s', '%s')", (input_title, input_quadrant, input_ring) => {
      expect(() => new Blip(input_title, input_quadrant, input_ring)).toThrow(/A blip must have a non-empty.*/);
    });

  test("arguments are assigned to the correct fields", () => {
    const title = 'my blip', catgeory = 'my cat', ring = 'my ring'
    const blip = new Blip(title, catgeory, ring);

    expect(blip.title).toBe(title);
    expect(blip.quadrantTitle).toBe(catgeory);
    expect(blip.ring).toBe(ring);
  });
});
