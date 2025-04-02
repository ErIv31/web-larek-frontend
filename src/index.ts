import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/presenter/AppApi';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/Page';
import { Modal } from './components/view/Modal';
import { Card } from './components/view/Card';
import { Basket } from './components/view/Basket';
import { Order } from './components/view/Order';
import { Contacts } from './components/view/Contacts';
import { Success } from './components/view/Success';
import { CardsData } from './components/model/CardsModel';
import { BasketData } from './components/model/BasketModel';
import { OrderData } from './components/model/OrderModel';
import { IProduct, IOrderForm, IContactsForm, IOrder, IOrderResult } from './types';

const events = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);

const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const cardsData = new CardsData({}, events);
const basketData = new BasketData({}, events);
const orderData = new OrderData({}, events);

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);

events.on('items:changed', () => {
  page.catalog = cardsData.catalog.map(item => {
    const card = new Card(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('card:select', item)
    });
    return card.render({
      category: item.category,
      title: item.title,
      image: item.image,
      price: item.price
    });
  });

  page.counter = basketData.getBasketItems().length;
});

events.on('contacs:submit', () => {
  api.postOrder(orderData.order)
    .then((result: IOrderResult) => {
      const success = new Success(cloneTemplate(successTemplate), {
        onClick: () => {
          modal.close();
          basketData.clearBasket();
        }
      });

      modal.render({
        content: success.render({
          total: result.total
        })
      });
    })
    .catch(err => {
      console.error(err);
    });
});

events.on('contactsFormErrors:change', (errors: Partial<IContactsForm>) => {
  const {email, phone} = errors;
  contacts.valid = !email && !phone;
  contacts.errors = Object.values({email, phone}).filter(i => !!i).join('; ');
})

events.on(/^contacts\..*:change/, (data: { field: keyof IContactsForm, value: string }) => {
  orderData.setOrderField(data.field, data.value);
  orderData.validateContacts();
});

events.on('orderFormErrors:change', (errors: Partial<IOrderForm>) => {
  const {payment, address} = errors;
  order.valid = !payment && !address;
  order.errors = Object.values({payment, address}).filter(i => !!i).join('; ');
})

events.on(/^order\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
  orderData.setOrderField(data.field, data.value);
  orderData.validateOrder();
});

events.on('card:select', (item: IProduct) => {
  cardsData.setPreview(item);
});
