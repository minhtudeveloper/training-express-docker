export interface IWrite<T> {
  create(item: object): Promise<boolean>;
  update(query: object, item: object): Promise<boolean>;
  updateOne(query: object, item: object): Promise<boolean>;
  deleteOneFlag(query: object, item: object): Promise<boolean>;
  findByIdAndUpdate(id: string, item: object): Promise<boolean>;
  findOneAndUpdate(query: object, item: object): Promise<boolean>;
  delete(query: object): Promise<boolean>;
}
