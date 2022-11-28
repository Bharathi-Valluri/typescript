import { MongoClient } from 'mongodb'

const uri =
  'mongodb+srv://Mongodb:mongodb123@cluster0.sxhitmf.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri)

const db = client.db('mongo_db')

export { db }
