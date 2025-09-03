export interface BookTypeRow {}

export class Book {
  protected id: number | null;
  protected title: string;
  protected author_id: number;
  protected publisher_id: number;
  protected category_id: number;
  protected publication_year: number;

  constructor(
    id: number | null,
    title: string,
    author_id: number,
    publisher_id: number,
    category_id: number,
    publication_year: number
  ) {
    this.id = id;
    this.title = title;
    this.author_id = author_id;
    this.publisher_id = publisher_id;
    this.category_id = category_id;
    this.publication_year = publication_year;
  }

  getId = () => {
    return this.id;
  };

  getTitle = () => {
    return this.title;
  };

  getAuthorId = () => {
    return this.author_id;
  };

  getPublisherId = () => {
    return this.publisher_id;
  };

  getCategoryId = () => {
    return this.category_id;
  };

  getPublicationYear = () => {
    return this.publication_year;
  };
}
