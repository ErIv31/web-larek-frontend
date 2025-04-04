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

Данные товара

```js
interface IProduct {
  id: string;
  description: string;
  image: string;  
  title: string;  
  category: string;
  price: number | null;  
}
```
Данные корзины

```js
interface IAppState {
  catalog: IProduct[];
  basket: string[];
  preview: string | null;
  order: IOrder | null;
  loading: boolean;
}
```

Заказ
Данные пользователя при выборе оплаты и адреса

```js
interface IOrderForm {
  payment: string;
  address: string;
}
```

Данные пользователя при вводе почты и телефона

```js
interface IContactsForm {
  email: string;
  phone: string;
}
```

Финальные данные заказа

```js
interface IOrderResult {
  id: string;
  total: number;
}
```
Типы данных заказа

```js
type IOrderType = IOrderForm & IContactsForm;
```

Типы данных ошибок

```js
type FormErrors = Partial<Record<keyof IOrder, string>>;
```

## Базовый код

### Класс Api
Здесь реализована базовая логика отправки запросов.
Методы:
- `GET` - выполняет GET запрос, необходим для получения данных с сервера.
- `POST` - выполняет POST запрос, необходим для отправки данных на сервер.

### Класс EventEmitter
Брокер событий, который позволяет подписываться на события, отправлять события.
Методы:
- `on` - этот метод, позволяет подписаться на событие;
- `off` - этот метод, позволяет отписаться от события;
- `emit` - этот метод принимает имя события, которое мы хотим всем транслировать, и данные, которые будут отправляться в момент этого события;
- `trigger` - этот метод генерирует событие с заданными параметрами.

### Класс Component
Класс представления (View), который обеспечивает базовый функционал для дочерних компонентов.
Методы:
- `toggleClass` — переключает класс;
- `setText` — устанавливает текстовое содержимое;
- `setDisabled` — сменяет статус блокировки;
- `setVisible` — показывает компонент;
- `setHidden` — скрывает компонент;
- `setImage` — устанавливает изображение с альтернативным текстом;
- `render` — возвращает корневой DOM-элемент.

### Класс Model
Базовая модель, чтобы можно было отличить ее от простых объектов с данными. 
Методы:
- `emitChanges` — сообщает всем, что модель поменялась.

### Слой данных (Model)
## Класс AppData
Класс AppData отвечает за хранение и логику работы с данными товаров, корзины и заказа.

Данные полей класса:
- `catalog` - массив товаров;
- `preview` - id карточки, выбранной для просмотра в модальном окне;
- `loading` - статус данных;
- `order` - информация о заказе;
- `formErrors` - информация по валидации.

Методы для взаимодействия с данными:
- `setCatalog` - заполняет массив карточками;
- `setPreview` - записывает идентификатор карточки, на которую нажали;
- `getBasketItems` - передает массив товаров, которые находятся в корзине;
- `getTotal` - передает итоговую стоимость заказа;
- `toogleOrderedItem` - отвечает за добавление или удаление товара в/из корзину/-ы;
- `checkItemInBasket` - отвечает за проверку товара в корзине, есть или нет;
- `clearBasket` - очищает корзину;
- `setOrderField` - заполняет данные пользователя для заказа;
- `validateOrder` - проверка валидации оплаты и адреса в заказе;
- `validateContacts` - проверка валидации почты и телефона в заказе;
а так же сеттеры и геттеры для сохранения и получения данных из полей класса.

### Слой представления (View)
## Класс Modal
Класс Modal реализует модальное окно. Открывается по клику на карточку. Закрывается по клику вне модального окна, по клику на крестик. 

Данные полей класса:
- `content: HTMLElement` - элемент модального окна;

Методы:
- `open` - открывает модальное окно;
- `close` - закрывает модальное окно;
- `set content` - добовляет контент в модальное окно;
- `render` - обновляет состояние модального окна.

## Класс Form
Класс Form - это абстрактный класс и расширяет класс Component.

Данные полей класса:
- `_submit: HTMLButtonElement` - кнопка сабмита формы.
- `_errors: HTMLElement` - элемент для вывода ошибки;

Методы:
- `onInputChange` - отвечает за обработку изменений значения в поле формы;
- `render` - рендер содержимого формы;
- `set valid` - устанавливает состояние кнопки;
- `set errors` - устанавливает текст ошибки.

## Класс Page
Класс Page реализует главную страницу приложения.

Данные полей класса:
- `_catalog` - элемент отображения карточек товаров;
- `_basket` - элемент отображения корзины;
- `_counter` - элемент отображения количества товаров в корзине;
- `_wrapper` - элемент для блокировки страницы при открытии модального окна.

Методы:
- `set catalog` - сохраняет массив карточек;
- `set counter` - сохраняет количество товаров в корзине;
- `set locked` - блокирует страницу при открытии модального окна.

## Класс Card
Класс Card реализует компонент карточки.

Данные полей класса:
- `_title` - элемент содержащий заголовок карточки;
- `_price` - элемент содержащий стоимость товара;
- `_index` - элемент содержащий индекс товара для корзины;
- `_category` - элемент содержащий категорию товара;
- `_image` - элемент содержащий изображение карточки;
- `_description` - элемент содержащий описание товара;
- `_button` - элемент содержащий кнопку добавления товара в корзину или удаления товара из корзины.

Методы:
- `set title` - записывает название карточки; 
- `set price` - записывает стоимость товарв;
- `set index` - сохраняет индекс товара;
- `set category` - записывает категорию товара;
- `set image` - сохраняет изображение карточки;
- `set description` - записывает описание товара;

## Класс Order
Класс Order реализует форму для отображения адреса и способа оплаты.

Данные полей класса:
- `_buttons: HTMLButtonElement` - кнопка способа оплаты.

Методы:
- `select` - добовляет выбранный способ оплаты и меняет статус кнопки на активный;
- `set address` - добавляет адрес доставки.

## Класс Contacts
Класс Contacts реализует форму для отображения электронный почты и телефона пользователя.

Методы:
- `set email` - добавляет значение почты пользователя;
- `set phone` - добавляет значение телефона пользователя.

## Класс Basket
Класс Basket реализует компонент корзины. Он отображает карточки, добавленные в корзину, общую стоимость и кнопку оформление заказа.

Данные полей класса:
- `_list` - список добавленных карточек в корзину;
- `_button` - кнопка оформления заказа;
- `_total` - элемент с итоговой стоимостью заказа;

Методы:
- `set items` - отображает список карточек в корзине;
- `set total` - отображает итоговую стоимость заказа.

## Класс Success
Класс Success реализует успешное оформление заказа.

Данные полей класса:
- `_total` - итоговая стоимость товаров;
- `_close` - кнопка закрытия модального окна.

Методы:
- `set total` - добавляет итоговую стоимость товаров.

### Слой коммуникации (Presenter)
## Класс AppApi
Класс AppApi принимает в конструктор экземпляр класса который реализует интерфейс IAppApi и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

Методы:
- `getProductList` - получает массив карточек;
- `postOrder` - post-запрос отправки данных заказа и получения успешного ответа от сервера или ошибок.

### Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

## Список событий

- `items:changed` - изменился массив товаров;
- `card:select` - выбор карточки товара, которая откроется в модальном окне;
- `preview:change` - изменился статус просмотра карточки;
- `basket:changed` - изменилась корзина с товарами;
- `basket:open` - открытие модального окна с корзиной;
- `order:open` - открытие модального окна с формой заказа оплаты и адресом;
- `order:submit` - открытие модального окна с формой заказа почты и телефоном;
- `orderFormErrors:change` - изменилась форма заказа оплаты и адреса;
- `contactsFormErrors:change` - изменилась форма заказа почты и телефона;
- `contacts:submit` - отправка данных заказа на сервер и открытие модального окна с успешным заказом;
- `modal:open` - открытие модального окна;
- `modal:close` - закрытие модального окна.

## Пример взаимодействия слоя данных со слоем представления
Пользователь открывает корзину нажатием на иконку корзины. Срабатывает событие `basket:open`, отображаются данные корзины, список товаров (данные получаем из класса `AppData` `getBasketItems`), отображается итоговая стоимость товаров (данные получаем из класса `AppData` `getTotal`).
