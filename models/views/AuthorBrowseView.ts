import { Author } from "../Author";

export interface AuthorBrowseViewTypeRow {
  id: number | null;
  first_name: string;
  last_name: string;
  book_count: number;
}

export class AuthorBrowseView extends Author {
  protected bookCount: number;

  constructor(
    id: number | null,
    firstName: string,
    lastName: string,
    bookCount: number
  ) {
    super(id, firstName, lastName);
    this.bookCount = bookCount;
  }

  static fromRow(row: AuthorBrowseViewTypeRow): AuthorBrowseView {
    return new AuthorBrowseView(
      row.id,
      row.first_name,
      row.last_name,
      row.book_count
    );
  }

  getBookCount() {
    if (this.bookCount < 2) {
      return `${this.bookCount} publication`;
    }

    return `${this.bookCount} publications`;
  }
}
