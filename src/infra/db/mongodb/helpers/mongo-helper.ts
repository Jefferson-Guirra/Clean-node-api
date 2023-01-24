import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null,
  db: null as MongoClient | null,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },
  async disconnect () {
    await this.client?.close()
  },
  getCollection (name: string) {
    return this.client?.db().collection(name)
  },
  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id.toString() })
  }
}
