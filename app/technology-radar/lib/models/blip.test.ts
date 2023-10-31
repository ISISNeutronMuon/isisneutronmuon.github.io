import { Blip } from './blip';

describe('Blip construction tests', () => {
  it.each([
    ['', '', '', ''],
    ['', 'quadrant', 'ring', 'md-descr'],
    ['title', '', 'ring', 'md-descr'],
    ['title', 'quadrant', '', 'md-descr'],
    ['title', 'quadrant', 'ring', ''],
  ])
    ("with attribute strings ('%s', '%s', '%s')", (input_title, input_quadrant, input_ring, input_desc) => {
      expect(() => new Blip(1, input_title, input_quadrant, input_ring, input_desc)).toThrow(/A blip must have a non-empty.*/);
    });

  test("arguments are assigned to the correct fields", () => {
    const title = 'my blip', catgeory = 'my cat', ring = 'my ring', desc = 'desc'
    const blip = new Blip(1, title, catgeory, ring, desc);

    expect(blip.title).toBe(title);
    expect(blip.quadrantId).toBe(catgeory);
    expect(blip.ring).toBe(ring);
    expect(blip.description).toBe(desc);
  });

  test("id field is as given on construction", () => {
    const id = 10;
    const blip = new Blip(id, 'title', 'quadrant', 'ring', 'desc');
    expect(blip.id).toBe(id);
  });
});
