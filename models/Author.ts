export interface AuthorTypeRow {
  id: number | null;
  first_name: string;
  last_name: string;
}

export class Author {
  protected id: number | null;
  protected firstName: string;
  protected lastName: string;

  constructor(id: number | null, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static fromRow(row: AuthorTypeRow): Author {
    return new Author(row.id, row.first_name, row.last_name);
  }

  getId() {
    return this.id;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
