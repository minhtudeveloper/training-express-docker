import { IWrite } from "./IWrite";
import { IRead } from "./IRead";
import mongoose from "mongoose";

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly _collection: any;

  constructor(collectionName: string, schema: any) {
    this._collection = mongoose.model<T>(collectionName, schema);
  }

  async create(item: object): Promise<any> {
    return await this._collection.create(item);
  }
  async update(query: object, item: object): Promise<any> {
    return await this._collection.update(query, item);
  }
  async updateOne(query: object, item: object): Promise<any> {
    return await this._collection.updateOne(query, item);
  }
  async findByIdAndUpdate(id: string, item: object): Promise<any> {
    return await this._collection.findByIdAndUpdate(id, item);
  }
  async findOneAndUpdate(query: object, item: object): Promise<any> {
    return await this._collection.findOneAndUpdate(query, item);
  }
  async find(item: object = {}): Promise<T[]> {
    return await this._collection.find(item);
  }
  async findOne(query: object): Promise<T> {
    return await this._collection.findOne(query);
  }
  async deleteOneFlag(query: object, item: object): Promise<any> {
    return await this._collection.updateOne(query, item);
  }
  async delete(query: object): Promise<any> {
    return await this._collection.delete(query);
  }
}
