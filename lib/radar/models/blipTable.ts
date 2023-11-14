import { Blip } from "./blip";

type BlipMap = Map<number, Blip>;

export class BlipTable {
  private _data: BlipMap;

  constructor(blipProps: any[] | null = null) {
    this._data = new Map();
    if (blipProps)
      _fillBlipMap(this._data, blipProps)
  }

  appendBlip(...blipArgs: string[]): void {
    const id = this._data.size + 1;
    // @ts-expect-error Typescript gives an error that the blipArgs array is not
    // a fixed size but that's what we want so we avoid duplicating the Blip
    // constructor
    this._data.set(id, new Blip(id, ...blipArgs));
  }

  get size(): number {
    return this._data.size;
  }

  getById(id: number): Blip | undefined {
    return this._data.get(id)
  }

  getByRef(refName: string): Blip | undefined {
    for (const [_, blip] of this._data) {
      if (blip.refName == refName)
        return blip;
    }

    return undefined;
  }

  ids(): IterableIterator<number> {
    return this._data.keys();
  }

  // Emulate Array.map to iterate and produce an Array of results
  // for each element in the table. The function signature of the
  // callback mimics Array.map where the second value is the index
  // and not the map key.
  map(callbackfn: (value: Blip, index: number) => any): any[] {
    let results: any[] = []
    let resultIndex = 0;
    this._data.forEach((blip: Blip) => {
      results.push(callbackfn(blip, resultIndex));
      resultIndex += 1;
    });
    return results;
  }

  filterByQuadrant(quadrantId: string): BlipTable {
    const filtered = new BlipTable();
    this._data.forEach((value) => {
      if (value.quadrantId == quadrantId) {
        filtered._data.set(value.id, value);
      }
    });
    return filtered;
  }

  filterByRing(ringTitle: string): BlipTable {
    const filtered = new BlipTable();
    const ringTitleLower = ringTitle.toLowerCase();
    this._data.forEach((value) => {
      if (value.ring == ringTitleLower) {
        filtered._data.set(value.id, value);
      }
    });
    return filtered;
  }
};

function _fillBlipMap(blipMap: BlipMap, blipPropsList: any[]): void {
  blipPropsList.forEach((blipProps) => {
    blipMap.set(blipProps.id, Blip.fromObject(blipProps));
  });
}
