import { Model } from "../base/model";
import { ICardBasketData, TCardBasket } from "../../types/index";

export class BasketData extends Model <ICardBasketData> {
  protected _items: TCardBasket[] = [];

  set items(items: TCardBasket[]) {
    this._items = items;
    this.events.emit('basket: change', this._items);
  }

  get items() {
    return this._items;
  }

  addToBasket(item: TCardBasket): void {
    this._items = [item, ...this._items];
  }

  removeFromBasket(itemId: string): void {
    this._items = this._items.filter(item => item.id !== itemId);
  }

  getCardBasket(): string[] {
    return this._items.map(item => item.id)
  }

  getCardBasketAmount(): number {
    return this._items.length;
  }

  getPrice(): number {
    return this._items.reduce((total, item) => total + item.price, 0);
  }

  checkCardinBasket(itemId: string) {
    return this._items.some(item => item.id === itemId);
  }

  clearBasket(): void {
    this._items = [];
  }
}