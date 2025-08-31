export interface CategoryTypeRow {
  id: number | null;
  name: string;
}

export class Category {
  protected id: number | null;
  protected name: string;

  constructor(id: number | null, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromRow(row: CategoryTypeRow): Category {
    return new Category(row.id, row.name);
  }

  getId() {
    return this.id;
  }
  
  getName() {
    return this.name;
  }
}
