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

  entries(): IterableIterator<[number, Blip]> {
    return this._data.entries();
  }

  appendBlip(...blipArgs: string[]) {
    const id = this._data.size + 1;
    this._data.set(id, new Blip(id, blipArgs[0], blipArgs[1], blipArgs[2]));
  }


}
;
