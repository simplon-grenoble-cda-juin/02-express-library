export interface BookTypeRow {}

export class Book {
  protected id: number | null;
  protected title: string;
  protected publisher_id: number;
  protected category_id: number;
  protected publication_year: number;

  constructor(
    id: number | null,
    title: string,
    publisher_id: number,
    category_id: number,
    publication_year: number
  ) {
    this.id = id;
    this.title = title;
    this.publisher_id = publisher_id;
    this.category_id = category_id;
    this.publication_year = publication_year;
  }
}
