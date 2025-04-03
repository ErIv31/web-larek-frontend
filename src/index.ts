import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/presenter/AppApi';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/Page';
import { Modal } from './components/view/Modal';
import { Card, CardPreview, CardBasket } from './components/view/Card';
import { Basket } from './components/view/Basket';
import { Order } from './components/view/Order';
import { Contacts } from './components/view/Contacts';
import { Success } from './components/view/Success';
import { AppData } from './components/model/AppData';
import { IProduct, IOrderForm, IContactsForm, IOrderResult } from './types';

const events = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);

const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const appData = new AppData({}, events);

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events, {
  onClick: name => {
    events.emit('order.payment:changed', { field: 'payment', value: name });
  }
});

events.on('items:changed', () => {
  page.catalog = appData.catalog.map(item => {
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

  page.counter = appData.getBasketItems().length;
});

events.on('card:select', (item: IProduct) => {
  appData.setPreview(item);
});

events.on('preview:changed', (item: IProduct) => {
  const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      appData.toogleOrderedItem(item.id, !appData.checkItemInBasket(item.id));
      events.emit('preview:changed', item);
    }
  });
  card.toggleButton(appData.checkItemInBasket(item.id));
  modal.render({
    content: card.render({
      category: item.category,
      title: item.title,
      description: item.description,
      image: item.image,
      price: item.price
    })
  });  
})

events.on('basket:changed', () => {
  page.counter = appData.getBasketItems().length;
  basket.total = appData.getTotal();
  basket.items = appData.getBasketItems().map((item, index) => {
    const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
      onClick: () => {
        appData.toogleOrderedItem(item.id, !appData.checkItemInBasket(item.id));
      }
    });
    return card.render({
      index: index + 1,
      title: item.title,
      price: item.price
    });
  });
});

events.on('basket:open', () => {
  modal.render({
    content: basket.render()
  });
});

events.on('order:open', () => {
  modal.render({
    content: order.render({
      payment: appData.order.payment,
      address: appData.order.address,
      valid: appData.validateOrder(),
      errors: []
    })
  });
});

events.on('order:submit', () => {
  modal.render({
    content: contacts.render({
      email: appData.order.email,
      phone: appData.order.phone,
      valid: appData.validateContacts(),
      errors: []
    })
  });
});

events.on(/^order\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
  appData.setOrderField(data.field, data.value);
  appData.validateOrder();
});

events.on('orderFormErrors:change', (errors: Partial<IOrderForm>) => {
  const {payment, address} = errors;
  order.valid = !payment && !address;
  if(!payment)
    order.select(appData.order.payment);
  order.errors = Object.values({payment, address}).filter(i => !!i).join('; ');
})

events.on(/^contacts\..*:change/, (data: { field: keyof IContactsForm, value: string }) => {
  appData.setOrderField(data.field, data.value);
  appData.validateContacts();
});

events.on('contactsFormErrors:change', (errors: Partial<IContactsForm>) => {
  const {email, phone} = errors;
  contacts.valid = !email && !phone;
  contacts.errors = Object.values({email, phone}).filter(i => !!i).join('; ');
})

events.on('contacts:submit', () => {
  const order = appData.order;
  order.total = appData.getTotal();
  api.postOrder(appData.order)
    .then((result: IOrderResult) => {
      const success = new Success(cloneTemplate(successTemplate), {
        onClick: () => modal.close()
      });
      appData.clearBasket();
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

events.on('modal:open', () => {
  page.locked = true;
});

events.on('modal:close', () => {
  page.locked = false;
});

api.getProductList()
  .then(res => 
    appData.setCatalog(res))
  .catch(err => {
    console.error(err);
  });