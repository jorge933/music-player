export interface BaseCrudMethods<T> {
  create(item: T | Omit<T, string>): void;
  getAll(): T[];
  getById(id: string | number): T | undefined;
  update(item: T): void;
  delete(id: string | number): void;
}
