import mysql, {
  FieldPacket,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";
import "dotenv/config";

// TODO: So apparently there is a difference between using createConnection and createPool
// createConnection is typically for standalone connections where high traffic
// (requests for multiple simultaneous queriees) is not expected
// Right now, we shall start with the createConnection and move towards using createPool when there's much higher traffic
// The performance would be benchmarked.

// Make a connection to the database.
export const db = await mysql
  .createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
  })
  .then((res) => {
    console.log("Connection to Db established! ✅");
    console.log(
      `MySQL Server running at port http://localhost:${process.env.MYSQL_PORT}`,
    );
    return res;
  })
  .catch((err) => {
    console.error("Error connecting to Db! ❌");
    throw err;
  });

export async function query<T extends RowDataPacket[] | ResultSetHeader>(
  sql: string,
  params?: (string | number)[],
): Promise<[T, FieldPacket[]]> {
  return db.query<T>(sql, params);
}
