export class Blip {
  // A unqiue id to identify this blip in a collection
  id: number;

  // metadata
  refName: string; // Used for URLs, no spaces, all lowercase
  title: string;
  quadrantId: string;
  ring: string;
  description: string;

  constructor(id: number, refName: string, title: string, quadrantId: string,
    ring: string, description: string) {
    this.id = id;
    this.refName = refName;
    this.title = title;
    this.quadrantId = quadrantId;
    this.ring = ring;
    this.description = description;

    this.throwIfObjectInvalid();
  }

  static fromObject(props: {
    id: number;
    refName: string;
    title: string;
    quadrantId: string;
    ring: string;
    description: string;
  }) {
    return new Blip(props.id, props.refName, props.title, props.quadrantId, props.ring, props.description);
  }

  // Return a flat object representation of this Blip
  toObject(): {
    id: number;
    refName: string;
    title: string;
    quadrantId: string;
    ring: string;
    description: string;
  } {
    return {
      id: this.id,
      refName: this.refName,
      title: this.title,
      quadrantId: this.quadrantId,
      ring: this.ring,
      description: this.description
    }
  }

  private throwIfObjectInvalid() {
    let throwIfFieldEmpty = (fieldName: string) => {
      let attr = undefined;
      try {
        // @ts-ignore Access via name lookup not defined but it's internal so fine
        attr = this[fieldName];
      } catch (err: any) {
        throw Error(`Unexpected field name '${fieldName}'`);
      }
      if (attr.length == 0) {
        throw Error(`A blip must have a non-empty ${fieldName}`);
      }
    };

    throwIfFieldEmpty("refName");
    throwIfFieldEmpty("title");
    throwIfFieldEmpty("quadrantId");
    throwIfFieldEmpty("ring");
    throwIfFieldEmpty("description");
  }
};
