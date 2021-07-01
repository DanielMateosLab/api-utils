import { Db, MongoClient } from "mongodb";
import { MissingEnvVarError } from "./errors";

let client: MongoClient | undefined;
let db: Db | undefined;

/**
 * Makes a connection with the URI specified in DB_URI environment variable and returns
 * the db specified in DB_NAME environment variable.
 */
export async function connectToDb(): Promise<Db> {
  if (!client) {
    client = getClient();
  }

  if (!client.isConnected()) {
    await client.connect();
  }

  if (!db) {
    const DB_NAME = getDbName();
    db = client.db(DB_NAME);
  }

  return db;
}

function getClient(): MongoClient {
  const DB_URI = getDbURI();

  const client = new MongoClient(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client;
}

function getDbURI(): string {
  const DB_URI = process.env.DB_URI;

  if (DB_URI == undefined) {
    throw new MissingEnvVarError("DB_URI");
  }

  return DB_URI;
}

function getDbName(): string {
  const DB_NAME = process.env.NODE_ENV == "test" ? "test" : process.env.DB_NAME;

  if (DB_NAME == undefined) {
    throw new MissingEnvVarError("DB_NAME");
  }

  return DB_NAME;
}
