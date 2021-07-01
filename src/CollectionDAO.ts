import { Collection, Db } from "mongodb"

export default class CollectionDAO<CollectionSchema> {
  protected collection: Collection<CollectionSchema>

  constructor(db: Db, collectionName: string) {
    this.collection = db.collection<CollectionSchema>(collectionName)
  }
}
