import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

function getClientPromise() {
  if (!uri) {
    return null;
  }

  if (clientPromise) {
    return clientPromise;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getUrlCollection() {
  const promise = getClientPromise();

  if (!promise) {
    throw new Error("MONGODB_URI is missing. Add it to .env.local to enable URL storage.");
  }

  const mongoClient = await promise;
  return mongoClient.db("URLite").collection("url");
}

export default getClientPromise();
