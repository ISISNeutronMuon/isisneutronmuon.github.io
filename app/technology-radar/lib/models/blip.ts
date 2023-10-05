export class Blip {
  title: string

  constructor(title: string) {
    this.title = title;

    this.throwIfObjectInvalid();
  }

  private throwIfObjectInvalid() {
    if (this.title.length == 0) {
      throw Error('A blip must have a non-empty title');
    }
  }

};
