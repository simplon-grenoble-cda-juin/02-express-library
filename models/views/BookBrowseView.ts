import { Author } from "../Author";
import { Book } from "../Book";
import { Category } from "../Category";

export interface BookBrowseViewTypeRow {
  id: number | null;
  title: string;
  author_id: number;
  author_first_name: string;
  author_last_name: string;
  publisher_id: number;
  category_id: number;
  category_name: string;
  publication_year: number;
}

export class BookBrowseView extends Book {
  protected author: Author;
  protected category: Category;

  constructor(
    id: number | null,
    title: string,
    authorId: number,
    authorFirstName: string,
    authorLastName: string,
    publisherId: number,
    categoryId: number,
    categoryName: string,
    publicationYear: number
  ) {
    super(id, title, authorId, publisherId, categoryId, publicationYear);

    this.author = new Author(authorId, authorFirstName, authorLastName);
    this.category = new Category(categoryId, categoryName);
  }

  static fromRow(row: BookBrowseViewTypeRow): BookBrowseView {
    return new BookBrowseView(
      row.id,
      row.title,
      row.author_id,
      row.author_first_name,
      row.author_last_name,
      row.publisher_id,
      row.category_id,
      row.category_name,
      row.publication_year
    );
  }

  getAuthor() {
    return this.author;
  }

  getCategory() {
    return this.category;
  }
}
