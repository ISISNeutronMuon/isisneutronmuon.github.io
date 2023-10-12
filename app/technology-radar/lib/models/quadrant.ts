import { Blip } from "./blip";

export class Quadrant {
  title: string;
  blips: Blip[];

  // A named quadrant with no blips
  constructor(title: string) {
    this.title = title;
    this.blips = [];

    this.throwIfObjectInvalid();
  }

  addBlip(blip: Blip): void {
    if (blip.category == this.title) {
      this.blips.push(blip);
    } else {
      throw Error(`Blip category (${blip.category}) does not match quadrant title (${this.title}).`);
    }
  }

  private throwIfObjectInvalid() {
    if (this.title.length == 0) {
      throw Error('A blip must have a non-empty title');
    }
  }
};
