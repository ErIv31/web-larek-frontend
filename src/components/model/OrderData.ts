import { Model } from "../base/model";
import { IOrderContacts, IOrderPayment, FormErrors, IOrder } from "../../types/index";

export class OrderData extends Model <IOrder> {
  formErrors: FormErrors = {};
  orderPayment: IOrderPayment = {
    payment: '',
    address: ''
  };
  orderContacts: IOrderContacts = {
    email: '',
    phone: ''
  };

  setOrderDataFirst(data: keyof IOrderPayment, value: string) {
    this.orderPayment[data] = value;
    if (this.validateOrderFirst()) {
      this.events.emit('orderPayment: ready', this.orderPayment);
    }
  }

  validateOrderFirst() {
    const errors: typeof this.formErrors = {};
    if (!this.orderPayment.payment) {
      errors.payment = 'Необходимо выбрать способ оплаты';
    }
    if (!this.orderPayment.address) {
      errors.address = 'Необходимо указать адрес доставки';
    }
    this.formErrors = errors;
    this.events.emit('formErrorsFirst: change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  clearOrderFirst() {
    this.orderPayment = {
      payment: '',
      address: ''
    };
  }

  setOrderDataSecond(data: keyof IOrderContacts, value: string) {
    this.orderContacts[data] = value;
    if (this.validateOrderSecond()) {
      this.events.emit('orderContacts: ready', this.orderContacts);
    }
  }

  validateOrderSecond() {
    const errors: typeof this.formErrors = {};
    if (!this.orderContacts.email) {
      errors.email = 'Необходимо указать Email';
    }
    if (!this.orderContacts.phone) {
      errors.phone = 'Необходимо указать телефон';
    }
    this.formErrors = errors;
    this.events.emit('formErrorsSecond: change', this.formErrors);
    return Object.keys(errors).length === 0; 
  } 

  clearOrderSecond() {
    this.orderContacts = {
      email: '',
      phone: ''
    };
  }
}
