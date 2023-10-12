export class Blip {
  title: string;
  category: string;
  ring: string;

  constructor(title: string, category: string, ring: string) {
    this.title = title;
    this.category = category;
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
    throwIfFieldEmpty("category");
    throwIfFieldEmpty("ring");
  }

};
