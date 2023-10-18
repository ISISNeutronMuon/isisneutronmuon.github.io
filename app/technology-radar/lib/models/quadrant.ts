import { Blip } from "./blip";

export class Quadrant {
  title: string;
  blips: Blip[];

  // A named quadrant with an optional set of blips
  constructor(title: string, blips: Blip[] = []) {
    this.title = title;
    this.blips = blips;

    this.throwIfObjectInvalid();
  }

  addBlip(blip: Blip): void {
    if (blip.quadrantTitle == this.title) {
      this.blips.push(blip);
    } else {
      throw Error(`Blip quadrant (${blip.quadrantTitle}) does not match quadrant title (${this.title}).`);
    }
  }

  blipsInRing(ringTitle: string): Blip[] {
    return this.blips.filter((blip) => blip.ring == ringTitle);
  }

  private throwIfObjectInvalid() {
    if (this.title.length == 0) {
      throw Error('A blip must have a non-empty title');
    }
  }
};
