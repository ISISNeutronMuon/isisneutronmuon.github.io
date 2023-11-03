export class Blip {
  // A unqiue id to identify this blip in a collection
  id: number;

  // metadata
  refname: string; // Used for URLs, no spaces, all lowercase
  title: string;
  quadrantId: string;
  ring: string;
  description: string;

  constructor(id: number, refname: string, title: string, quadrantId: string,
    ring: string, description: string) {
    this.id = id;
    this.refname = refname;
    this.title = title;
    this.quadrantId = quadrantId;
    this.ring = ring;
    this.description = description;

    this.throwIfObjectInvalid();
  }

  static fromObject(props: {
    id: number;
    refname: string;
    title: string;
    quadrantId: string;
    ring: string;
    description: string;
  }) {
    return new Blip(props.id, props.refname, props.title, props.quadrantId, props.ring, props.description);
  }

  // Return a flat object representation of this Blip
  toObject(): {
    id: number;
    refname: string;
    title: string;
    quadrantId: string;
    ring: string;
    description: string;
  } {
    return {
      id: this.id,
      refname: this.refname,
      title: this.title,
      quadrantId: this.quadrantId,
      ring: this.ring,
      description: this.description
    }
  }

  private throwIfObjectInvalid() {
    let throwIfFieldEmpty = (fieldName: string) => {
      // @ts-ignore dict-like accessor is flagged as an error but is not
      if (this[fieldName].length == 0) {
        throw Error(`A blip must have a non-empty ${fieldName}`);
      }
    };

    throwIfFieldEmpty("refname");
    throwIfFieldEmpty("title");
    throwIfFieldEmpty("quadrantId");
    throwIfFieldEmpty("ring");
    throwIfFieldEmpty("description");
  }
};
