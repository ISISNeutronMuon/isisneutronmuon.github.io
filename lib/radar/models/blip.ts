export class Blip {
  // A unqiue id to identify this blip in a collection
  id: number;

  // metadata
  refName: string; // Used for URLs, no spaces, all lowercase
  title: string;
  quadrantId: string;
  ring: string;
  description: string; // Description of blip
  comments: string; // Comments on the current blip

  constructor(id: number, refName: string, title: string, quadrantId: string,
    ring: string, description: string, comments: string) {
    this.id = id;
    this.refName = refName;
    this.title = title;
    this.quadrantId = quadrantId;
    this.ring = ring;
    this.description = description;
    this.comments = comments;

    this.throwIfObjectInvalid();
  }

  static fromObject(props: {
    id: number;
    refName: string;
    title: string;
    quadrantId: string;
    ring: string;
    description: string;
    comments: string;
  }) {
    return new Blip(props.id, props.refName, props.title, props.quadrantId, props.ring,
      props.description, props.comments);
  }

  // Return a flat object representation of this Blip
  toObject(): {
    id: number;
    refName: string;
    title: string;
    quadrantId: string;
    ring: string;
    description: string;
    comments: string;
  } {
    return {
      id: this.id,
      refName: this.refName,
      title: this.title,
      quadrantId: this.quadrantId,
      ring: this.ring,
      description: this.description,
      comments: this.comments
    }
  }

  private throwIfObjectInvalid() {
    let throwIfFieldEmpty = (field: string) => {
      if (field.length == 0) {
        throw Error(`A blip must have a non-empty ${field}`);
      }
    }

    throwIfFieldEmpty(this.refName);
    throwIfFieldEmpty(this.title);
    throwIfFieldEmpty(this.quadrantId);
    throwIfFieldEmpty(this.ring);
    throwIfFieldEmpty(this.description);
    throwIfFieldEmpty(this.comments);
  }
};
