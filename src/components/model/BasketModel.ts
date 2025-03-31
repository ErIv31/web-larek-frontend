import _ from "lodash";
import { Model } from "../base/model";
import { IProduct, FormErrors, IOrder, IAppState } from "../../types/index";

export class BasketData extends Model <IAppState> {
  basket: string[];
  catalog: IProduct[];
  loading: boolean;  
  order: IOrder = {
    payment: '',
    address: '',
    email: '',
    phone: '',
    items: []
  };
  formErrors: FormErrors = {};

  toogleOrderedItem(id: string, isIncluded: boolean) {
    if (isIncluded) {
      this.order.items = _.uniq([...this.order.items, id]);
    } else {
      this.order.items = _.without(this.order.items, id);
    }
  }

  clearBasket() {
    this.order.items.forEach(id => this.toogleOrderedItem(id, false));
  }

  checkIteminBasket(id: string): boolean {
    return _.includes(this.order.items, id);
  }

  getTotal() {
    return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0);
  }

  getBasketItems(): IProduct[] {
    return this.catalog.filter(item => _.includes(this.order.items, item.id));
  }  
}