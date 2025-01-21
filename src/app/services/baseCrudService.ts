import { useStorage } from "@/hooks/useStorage/useStorage";
import { BaseCrudMethods } from "@/interfaces/BaseCrudMethods";

export class BaseCrudService<T> implements BaseCrudMethods<T> {
  readonly storage = useStorage();

  constructor(private readonly itemName: string) {}

  getAll(): T[] {
    const items = this.storage.getItem<T[]>(this.itemName) || [];

    return items;
  }

  getById(id: string | number): T | undefined {
    const items = this.getAll();

    return items.find((item: any) => item.id === id);
  }

  create(newItem: T): void {
    const items = this.getAll();

    items.push(newItem);

    this.storage.setItem(this.itemName, items);
  }

  delete(id: string | number): void {
    const items = this.getAll();

    const updatedItems = items.filter((item: any) => item.id !== id);

    this.storage.setItem(this.itemName, updatedItems);
  }

  update(updatedItem: T) {
    const items = this.getAll();

    const updatedItems = items.map((item: any) => {
      const isItemToUpdate = item.id === (updatedItem as any).id;

      return isItemToUpdate ? updatedItem : item;
    });

    this.storage.setItem(this.itemName, updatedItems);
  }
}
