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
export interface IOrderForms {
  payment: string;
  address: string;
  email: string; 
  phone: string; 
}

// Данные заказа при выборе оплаты и адреса
export interface IOrderFormFirst {
  payment: string;
  address: string;
}

// Данные заказа при вводе почты и телефона
export interface IOrderFormSecond {
  email: string;
  phone: string;
}

// Данные заказа
export interface IOderFormsData {
  setOrderDataFirst(): void;
  validateOrderFirst(): void;
  clearOrderFirst(): void;
  setOrderDataSecond(): void;    
  validateOrderSecond(): void;    
  clearOrderSecond(): void;
  formErrors: FormErrors;
}

export interface IOrderResult {
  id: string;
  amount: number;
}

// Типизируем Коллекции
// Коллекция Главная страницва. Перечень карточек на главной странице с учетом отображения карточки в отдельном окне
// Модель для хранения данных карточек
interface ICardsData {
    items: ICard[];
    preveiw: string | null; // идентификатор карточки при открытии в отдельном окне
    getCard(): ICard; //получить карточку по id
    getCardList(): ICard[]; //получить массив карточек
 }


//Коллекция Корзина
interface ICardBasketData {
    items: TCardBasket[]; //перечень карточек в корзине ?? может, ICard
    getCardListInBasket(): TCardBasket[]; //получить массив карточек, а именно id всех карточек)
    getCardListInBasketNumber(): number;  //чтобы число карточек получить для отображения на корзине
    addToBasket(): void; //добавить карточку в корзину
    removeFromBasket(): void; //удалить карточку из массива
    getTotalPrice(): number; // получить полную сумму заказа
    inBasket(): void;
    clearBasketData(): void; //очистить данные корзины после заказа
}

// Коллекция Заказ
interface IOrder extends IOrderForms {
    items: string[]; //перечень карточек в корзине ?? может, ICard
    total: number;
}

interface IOrderResult {
    id: string;
    total: number;
}

type FormErrors = Partial<Record<keyof IOrder, string>>;

export {
    TCardCategoryType,
    ICard,
    ICardList,
    TCardMainPage,
    TCardBasket,
    TCardBasketOrder,
    IOrderForms,
    IOderFormsData,
    ICardsData,
    ICardBasketData,
    IOrder,
    IOrderResult,
    FormErrors,
    IOrderFormsSecond,
    IOrderFormsFirst
}