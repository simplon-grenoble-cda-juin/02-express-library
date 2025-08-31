export interface BookTypeRow {
  id: number | null;
  title: string;
  author_id: number
  publisher_id: number;
  category_id: number;
  publication_year: number;
}

export class Book {
  protected id: number | null;
  protected title: string;
  protected authorId: number;
  protected publisherId: number;
  protected categoryId: number;
  protected publicationYear: number;

  constructor(
    id: number | null,
    title: string,
    authorId: number,
    publisherId: number,
    categoryId: number,
    publicationYear: number
  ) {
    this.id = id;
    this.title = title;
    this.authorId = authorId;
    this.publisherId = publisherId;
    this.categoryId = categoryId;
    this.publicationYear = publicationYear;
  }

  static fromRow(row: BookTypeRow): Book {
    return new Book(
      row.id,
      row.title,
      row.author_id,
      row.publisher_id,
      row.category_id,
      row.publication_year
    );
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getAuthorId() {
    return this.authorId;
  }

  getPublisherId() {
    return this.publisherId;
  }

  getCategoryId() {
    return this.categoryId;
  }

  getPublicationYear() {
    return this.publicationYear;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      author_id: this.authorId,
      publisher_id: this.publisherId,
      category_id: this.categoryId,
      publication_year: this.publicationYear,
    };
  }
}
