import pg from 'pg'
import { migrate } from "postgres-migrations"
//import { Pool } from 'pg'
let client: pg.Client;
//let pool =new Pool();
export default async function connect() {
  if (!client) {
    // we can fetch user and password from secret manager Ex: AWS secret manager
    const newClient = new pg.Client({
      user: 'admin',
      password: 'admin',
      host: 'localhost',
      database: 'fixer-upper'
    })
    await newClient.connect()
    // we can make use of pool
    //await newClient.pool.connect()

    client = newClient 
  }
  await migrate({ client }, './migrations')
  return client
}
