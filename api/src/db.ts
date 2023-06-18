import pg from 'pg'
import { migrate } from "postgres-migrations"

let client: pg.Client;

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
    client = newClient
  }
  await migrate({ client }, './migrations')
  return client
}
