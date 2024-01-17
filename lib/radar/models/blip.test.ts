import { Blip } from './blip';

describe('Blip construction tests', () => {
  test("with empty fields", () => {
    expect(() => new Blip(1, '', '', '', '', '', '')).toThrow(/A blip must have a non-empty.*/);
  });

  test("arguments are assigned to the correct fields", () => {
    const refname = 'refname', title = 'my blip', catgeory = 'my cat', ring = 'my ring', desc = 'desc', comments = 'comms'
    const blip = new Blip(1, refname, title, catgeory, ring, desc, comments);

    expect(blip.refName).toBe(refname);
    expect(blip.title).toBe(title);
    expect(blip.quadrantId).toBe(catgeory);
    expect(blip.ring).toBe(ring);
    expect(blip.description).toBe(desc);
    expect(blip.comments).toBe(comments);
  });

  test("id field is as given on construction", () => {
    const id = 10;
    const blip = new Blip(id, 'refname', 'title', 'quadrant', 'ring', 'desc', 'comments');
    expect(blip.id).toBe(id);
  });
});
