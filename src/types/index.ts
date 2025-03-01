//Карточка
// Данные по карточке
export interface ICard {
  id: string;
  description: string;
  image: string;  
  title: string;  
  category: string;
  price: number | null;
  index?: number;
}

// Массив карточек
export interface ICardArray {
  items: ICard[];
}

// Данные карточки, используемые в корзине
export type TCardBasket = Pick<ICard, 'id' | 'title' | 'price' | 'index'>;

//Корзина
export interface IBasket {
  items: TCardBasket[];
  addToBasket(): void;
  removeFromBasket(): void;
  getCardBasket(): TCardBasket[];
  getCardBasketAmount(): number;
  getPrice(): number;
  checkCardInBasket(): void;
  clearBasket(): void;
}

//Заказ
// Данные заказа при выборе оплаты и адреса
export interface IOrderPayment {
  payment: string;
  address: string;
}

// Данные заказа при вводе почты и телефона
export interface IOrderContacts {
  email: string;
  phone: string;
}

// Данные заказа
export interface IOderData {
  setOrderDataFirst(): void;
  validateOrderFirst(): void;
  clearOrderFirst(): void;
  setOrderDataSecond(): void;    
  validateOrderSecond(): void;    
  clearOrderSecond(): void;
  formErrors: FormErrors;
}

//Финальные данные заказа
export interface IOrderResult {
  id: string;
  amount: number;
}

// Коллекция хранения данных карточек
export interface ICardsData {
    items: ICard[];
    preveiw: string | null; 
    getCard(): ICard;
    getCardArray(): ICard[];
 }


//Коллекция Корзина
export interface ICardBasketData {
    items: TCardBasket[];
    addToBasket(): void;
    removeFromBasket(): void; 
    getCardBasket(): TCardBasket[];
    getCardBasketAmounter(): number;    
    getPrice(): number;
    checkCardinBasket(): void;
    clearBasket(): void;
}

// Коллекция Заказ
export interface IOrder extends IOrderPayment, IOrderContacts {
    items: string[]; 
    total: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;
