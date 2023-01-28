import { Collection, Document, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null,
  db: null as MongoClient | null,
  uri: null as string | null,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },
  async disconnect () {
    await this.client?.close()
    this.client = null
  },
  async getCollection (name: string): Promise<Collection<Document> > {
    if (this.client === null) {
      await this.connect(this.uri as string)
    }
    return this.client?.db().collection(name) as Collection<Document>
  },
  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id.toString() })
  }
}
