import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL)

mongoClient
   .connect()
   .then(() => {
      console.log('MONGODB CONECTADO!')
      db = mongoClient.db()
   })
   .catch((err) => console.log(`ERROR: ${err.message}`))

export let db = mongoClient.db();