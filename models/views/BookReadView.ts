import { Author } from "../Author";
import { Book } from "../Book";
import { Category } from "../Category";
import { Publisher } from "../Publisher";

export interface BookReadViewTypeRow {
  id: number | null;
  title: string;
  author_id: number;
  author_first_name: string;
  author_last_name: string;
  publisher_id: number;
  publisher_name: string;
  category_id: number;
  category_name: string;
  publication_year: number;
}

export class BookReadView extends Book {
  protected author: Author;
  protected publisher: Publisher;
  protected category: Category;

  constructor(
    id: number | null,
    title: string,
    authorId: number,
    authorFirstName: string,
    authorLastName: string,
    publisherId: number,
    publisherName: string,
    categoryId: number,
    categoryName: string,
    publicationYear: number
  ) {
    super(id, title, authorId, publisherId, categoryId, publicationYear);

    this.author = new Author(authorId, authorFirstName, authorLastName);
    this.publisher = new Publisher(publisherId, publisherName);
    this.category = new Category(categoryId, categoryName);
  }

  static fromRow(row: BookReadViewTypeRow): BookReadView {
    return new BookReadView(
      row.id,
      row.title,
      row.author_id,
      row.author_first_name,
      row.author_last_name,
      row.publisher_id,
      row.publisher_name,
      row.category_id,
      row.category_name,
      row.publication_year
    );
  }

  getAuthor() {
    return this.author;
  }

  getPublisher() {
    return this.publisher;
  }

  getCategory() {
    return this.category;
  }
}
