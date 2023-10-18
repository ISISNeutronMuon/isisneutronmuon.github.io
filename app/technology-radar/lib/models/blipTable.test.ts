import { BlipTable } from "./blipTable";

describe('BlipTable construction tests', () => {
  test("Default construction gives empty table", () => {
    expect(new BlipTable().size).toBe(0);
  })
});

describe('BlipTable addBlip', () => {
  test("addBlip increases size by 1", () => {
    const table = new BlipTable();
    table.appendBlip("blipTitle", "quadrant", "ring");
    expect(table.size).toBe(1);
  })
  test("addBlip assigns unique id to new blip", () => {
    const table = new BlipTable();
    table.appendBlip("blipTitle1", "quadrant", "ring");
    table.appendBlip("blipTitle2", "quadrant", "ring");
    expect(table.size).toBe(2);
    expect(new Set(table.ids()).size).toBe(2);
  })
});
