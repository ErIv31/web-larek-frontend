import _ from "lodash";
import { Model } from "../base/model";
import { IProduct, FormErrors, IOrder, IAppState } from "../../types/index";

export class BasketData extends Model <IAppState> {
  basket: string[];
  catalog: IProduct[];
  loading: boolean;
  preview: string | null;
  order: IOrder = {
    payment: '',
    address: '',
    email: '',
    phone: '',
    items: []
  };
  formErrors: FormErrors = {};

  addToBasket(id: string, isIncluded: boolean) {
    if (isIncluded) {
      this.order.items = _.uniq([...this.order.items, id]);
    } else {
      this.order.items = _.without(this.order.items, id);
    }
  }

  clearBasket() {
    this.order.items.forEach(id => this.addToBasket(id, false));
  }

  checkCardinBasket(id: string): boolean {
    return _.includes(this.order.items, id);
  }

  getTotal() {
    return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0);
  }

  setCatalog(items: IProduct[]) {
    this.catalog = Object.values(items);
    this.emitChanges('items:changed', { catalog: this.catalog });
  }

  getBasketItems(): IProduct[] {
    return this.catalog.filter(item => _.includes(this.order.items, item.id));
  }  
}