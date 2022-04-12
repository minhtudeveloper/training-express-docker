export interface IRead<T> {
  find(item: object): Promise<T[]>;
  findOne(query: object): Promise<T>;
}

