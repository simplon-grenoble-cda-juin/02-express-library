export interface PublisherTypeRow {
  id: number | null;
  name: string;
}

export class Publisher {
  protected id: number | null;
  protected name: string;

  constructor(id: number | null, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromRow(row: PublisherTypeRow): Publisher {
    return new Publisher(row.id, row.name);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }
}
