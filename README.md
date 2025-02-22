# Проектная работа "Веб-ларек"
https://github.com/ErIv31/web-larek-frontend.git

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура приложения

Приложение **Web-ларёк** построен по паттерну **MVP (Model-View-Presenter)**, который представлен 3 слоями:
- Модель (Model) предоставляет данные для пользовательского интерфейса.
- Представление (View) реализует отображение данных (Модели).
- Презентер (Presenter) обеспечивает взаимодействие между Моделью и Представлением, например, извлекает данные из Модели и форматирует их для отображения в Представлении.   

## Данные и типы данных, используемые в приложении

Карточка

```js
interface ICard {
  id: string;
  description: string;
  image: string;  
  title: string;  
  category: string;
  price: number | null;
  index?: number;
}
```

Массив карточек

```js
interface ICardArray {
  items: ICard[];
} 
```

Тип данных карточки в корзине

```js
type TCardBasket = Pick<ICard, '_id' | 'title' | 'price'>;
```

Корзина

```js
interface IBasket {
  items: TCardBasket[];
  addToBasket(): void;
  removeFromBasket(): void;
  getCardBasket(): TCardBasket[];
  getCardBasketAmount(): number;
  getPrice(): number;
  checkCardInBasket(): void;
  clearBasket(): void;
}
```

Заказ

```js
interface IOrder {
  payment: string;
  address: string;
  email: string;
  phone: string;
}
```

Данные пользователя при выборе оплаты и адреса

```js
interface IOrderDataFirst {
  payment: string;
  address: string;
}
```

Данные пользователя при вводе почты и телефона

```js
interface IOrderDataSecond {
  email: string;
  phone: string;
}
```

Коллекция данных пользователя при оформлении заказа

```js
interface IOderData {    
    setOrderDataFirst(): void;
    validateOrderFirst(): void;
    clearOrderFirst(): void;
    setOrderDataSecond(): void;    
    validateOrderSecond(): void;    
    clearOrderSecond(): void;
    formErrors: FormErrors;
}
```

```js
interface IOrderResult {
  id: string;
  amount: number;
}
```

Типы данных ошибок

```js
type FormErrors = Partial<Record<keyof IOrder, string>>;
```

## Базовый код

### Класс Api
Здесь реализована базовая логика отправки запросов.
Методы:
- GET: выполняет GET запрос, необходим для получения данных с сервера.
- POST: выполняет POST запрос, необходим для отправки данных на сервер.

### Класс EventEmitter
Брокер событий, который позволяет подписываться на события, отправлять события.
Методы:
- on: этот метод, позволяет подписаться на событие;
- off: этот метод, позволяет отписаться от события;
- emit: этот метод принимает имя события, которое мы хотим всем транслировать, и данные, которые будут отправляться в момент этого события;
- trigger: этот метод генерирует событие с заданными параметрами.

### Класс Component
Класс представления (View), который обеспечивает базовый функционал для дочерних компонентов.
Методы:
- toggleClass — переключает класс;
- setText — устанавливает текстовое содержимое;
- setDisabled — сменяет статус блокировки;
- setVisible — показывает компонент;
- setHidden — скрывает компонент;
- setImage — устанавливает изображение с альтернативным текстом;
- render — возвращает корневой DOM-элемент.

### Класс Model
Базовая модель, чтобы можно было отличить ее от простых объектов с данными. 
Методы:
- emitChanges — сообщает всем, что модель поменялась.