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

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }
}
