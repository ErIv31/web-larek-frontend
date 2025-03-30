import { Model } from "../base/model";
import { FormErrors, IOrder, IAppState, IOrderType } from "../../types/index";

export class OrderData extends Model <IAppState> {
  order: IOrder = {
    payment: '',
    address: '',
    email: '',
    phone: '',
    items: []
  };
  formErrors: FormErrors = {};

  setOrderField(field: keyof IOrderType, value: string) {
    this.order[field] = value;
  }

  validateOrder() {
    const errors: typeof this.formErrors = {};
    if (!this.order.payment) {
      errors.payment = 'Необходимо выбрать способ оплаты';
    }
    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес доставки';
    }
    this.formErrors = errors;
    this.events.emit('orderFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }  

  validateContacts() {
    const errors: typeof this.formErrors = {};
    if (!this.order.email) {
      errors.email = 'Необходимо указать Email';
    }
    if (!this.order.phone) {
      errors.phone = 'Необходимо указать телефон';
    }
    this.formErrors = errors;
    this.events.emit('contactsFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0; 
  } 
}
