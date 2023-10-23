import { Blip } from "./blip";


export class BlipTable {
  private _data: Map<number, Blip>;

  constructor() {
    this._data = new Map();
  }

  get size(): number {
    return this._data.size;
  }

  ids(): IterableIterator<number> {
    return this._data.keys();
  }

  blips(): IterableIterator<Blip> {
    return this._data.values();
  }

  entries(): IterableIterator<[number, Blip]> {
    return this._data.entries();
  }

  get(id: number): Blip | undefined {
    return this._data.get(id)
  }

  filterByQuadrant(quadrantId: string) {
    const filtered = new BlipTable();
    this._data.forEach((value) => {
      if (value.quadrantId == quadrantId) {
        filtered._data.set(value.id, value);
      }
    });
    return filtered;
  }

  filterByRing(ringTitle: string) {
    const filtered = new BlipTable();
    this._data.forEach((value) => {
      if (value.ring == ringTitle) {
        filtered._data.set(value.id, value);
      }
    });
    return filtered;
  }

  appendBlip(...blipArgs: string[]) {
    const id = this._data.size + 1;
    this._data.set(id, new Blip(id, blipArgs[0], blipArgs[1], blipArgs[2]));
  }


}
;
