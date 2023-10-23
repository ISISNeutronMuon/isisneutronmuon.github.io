import { Blip } from './blip';

describe('Blip construction tests', () => {
  it.each([
    ['', '', ''],
    ['', 'quadrant', 'ring'],
    ['title', '', 'ring'],
    ['title', 'quadrant', ''],
  ])
    ("with attribute strings ('%s', '%s', '%s')", (input_title, input_quadrant, input_ring) => {
      expect(() => new Blip(1, input_title, input_quadrant, input_ring)).toThrow(/A blip must have a non-empty.*/);
    });

  test("arguments are assigned to the correct fields", () => {
    const title = 'my blip', catgeory = 'my cat', ring = 'my ring'
    const blip = new Blip(1, title, catgeory, ring);

    expect(blip.title).toBe(title);
    expect(blip.quadrantId).toBe(catgeory);
    expect(blip.ring).toBe(ring);
  });

  test("id field is as given on construction", () => {
    const id = 10;
    const blip = new Blip(id, 'title', 'quadrant', 'ring');
    expect(blip.id).toBe(id);
  });
});
