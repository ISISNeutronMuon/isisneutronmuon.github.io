import { BlipTable } from "./blipTable"

export const PreviewVersionId = 'preview'

export class Radar {
  _version: string;
  _releaseDate: Date;
  _blips: BlipTable;

  constructor(version: string, releaseDate: Date, blips: BlipTable) {
    this._version = version;
    this._releaseDate = releaseDate;
    this._blips = blips;
  }

  get version(): string {
    return this._version;
  }

  get releaseDate(): Date {
    return this._releaseDate;
  }

  get blips(): BlipTable {
    return this._blips;
  }

  isPreview(): boolean {
    return this._version == PreviewVersionId;
  }
};
