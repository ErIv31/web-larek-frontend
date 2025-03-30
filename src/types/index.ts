// Данные товара
export interface IProduct {
  id: string;
  description: string;
  image: string;  
  title: string;  
  category: string;
  price: number | null;
}

/// Данные заказа при выборе оплаты и адреса
export interface IOrderForm {
  payment: string;
  address: string;
}

// Данные заказа при вводе почты и телефона
export interface IContactsForm {
  email: string;
  phone: string;
}

//Финальные данные заказа
export interface IOrderResult {
  id: string;
  total: number;
}

export type IOrderType = IOrderForm & IContactsForm;

// Коллекция Заказ
export interface IOrder extends IOrderType {
  items: string[]; 
  total?: number;
}

// Данные корзины
export interface IAppState {
  catalog: IProduct[];
  basket: string[];
  preview: string | null;
  order: IOrder | null;
  loading: boolean;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;
