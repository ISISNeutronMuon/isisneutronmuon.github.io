import { Blip } from "./blip";

type BlipMap = Map<number, Blip>;

export class BlipTable {
  private _data: BlipMap;

  constructor(blipProps: any[] | null = null) {
    this._data = new Map();
    if (blipProps)
      _fillBlipMap(this._data, blipProps)
  }

  appendBlip(...blipArgs: string[]) {
    const id = this._data.size + 1;
    // @ts-expect-error Typescript gives an error that the blipArgs array is not
    // a fixed size but that's what we want so we avoid duplicating the Blip
    // constructor
    this._data.set(id, new Blip(id, ...blipArgs));
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
};

function _fillBlipMap(blipMap: BlipMap, blipPropsList: any[]) {
  blipPropsList.forEach((blipProps) => {
    blipMap.set(blipProps.id, Blip.fromObject(blipProps));
  });
}
