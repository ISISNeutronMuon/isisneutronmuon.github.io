import { Blip } from './blip';

describe('Blip construction tests', () => {
  test("with empty fields", () => {
    expect(() => new Blip(1, '', '', '', '', '')).toThrow(/A blip must have a non-empty.*/);
  });

  test("arguments are assigned to the correct fields", () => {
    const refname = 'refname', title = 'my blip', catgeory = 'my cat', ring = 'my ring', desc = 'desc'
    const blip = new Blip(1, refname, title, catgeory, ring, desc);

    expect(blip.refName).toBe(refname);
    expect(blip.title).toBe(title);
    expect(blip.quadrantId).toBe(catgeory);
    expect(blip.ring).toBe(ring);
    expect(blip.description).toBe(desc);
  });

  test("id field is as given on construction", () => {
    const id = 10;
    const blip = new Blip(id, 'refname', 'title', 'quadrant', 'ring', 'desc');
    expect(blip.id).toBe(id);
  });
});
