export class Blip {
  title: string;
  quadrantTitle: string;
  ring: string;

  constructor(title: string, quadrantTitle: string, ring: string) {
    this.title = title;
    this.quadrantTitle = quadrantTitle;
    this.ring = ring;

    this.throwIfObjectInvalid();
  }

  private throwIfObjectInvalid() {
    let throwIfFieldEmpty = (fieldName: string) => {
      // @ts-ignore dict-like accessor is flagged as an error but is not
      if (this[fieldName].length == 0) {
        throw Error(`A blip must have a non-empty ${fieldName}`);
      }
    };

    throwIfFieldEmpty("title");
    throwIfFieldEmpty("quadrantTitle");
    throwIfFieldEmpty("ring");
  }

};
