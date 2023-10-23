export class Blip {
  // A unqiue id to identify this blip in a collection
  id: number;
  quadrantId: string;
  ring: string;
  title: string;


  constructor(id: number, title: string, quadrantId: string, ring: string) {
    this.id = id;
    this.title = title;
    this.quadrantId = quadrantId;
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
    throwIfFieldEmpty("quadrantId");
    throwIfFieldEmpty("ring");
  }
};
