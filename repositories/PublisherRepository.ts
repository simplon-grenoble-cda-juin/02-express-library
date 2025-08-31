import { Repository } from "../libs/Repository";
import { Publisher, PublisherTypeRow } from "../models/Publisher";

export class PublisherRepository extends Repository {
  // Récupère tous les éditeurs
  findAll = async (): Promise<Publisher[]> => {
    const query = {
      name: "fetch-all-publisher",
      text: `SELECT * FROM publisher ORDER BY name`,
    };

    const result = await this.pool.query<PublisherTypeRow>(query);
    const publishers = result.rows.map((row) => Publisher.fromRow(row));

    return publishers;
  };
}
