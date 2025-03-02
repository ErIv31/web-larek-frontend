import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/presenter/AppApi';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/Page';
import { Modal } from './components/view/Modal';
import { CardViewPreview, CardViewArray, CardViewInBasket } from './components/view/Card';
import { Basket } from './components/view/Basket';
import { OrderFormPayment } from './components/view/OrderFormPayment';
import { OrderFormContacts } from './components/view/OrderFormContacts';
import { Success } from './components/view/Success';
import { CardsData } from './components/model/CardsData';
import { BasketData } from './components/model/BasketData';
import { OrderData } from './components/model/OrderData';
import { ICard, ICardArray, IOrderPayment, IOrderContacts, IBasket, TCardBasket, IOderData } from './types';

const events = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);
const cardViewPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardViewArrayTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardViewInBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const paymentTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardsData = new CardsData({}, events);
const basketData = new BasketData({}, events);
const orederData = new OrderData({}, events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const paymentdeliverly = new OrderFormPayment(cloneTemplate(paymentTemplate), events);
const contacts = new OrderFormContacts(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);

events.on('modal: open', () => {
  page.locked = true;
});

events.on('modal: close', () => {
  page.locked = false;
});

events.on<ICardArray>('cardsList: change', () => {
  page.catalog = cardsData.getCardArray().map(item => {
    const card = new CardViewArray(cloneTemplate(cardViewArrayTemplate), {
      onClick: () => events.emit('card: select', item)
    });
    return card.render(item);
  });
});

events.on('card: select', (item: ICard) => {
  const cardPreview = new CardViewPreview(cloneTemplate(cardViewPreviewTemplate), {
    onClick: () => {
      if (basketData.checkCardinBasket(item.id)) {
        basketData.removeFromBasket(item.id);
        cardPreview.button = 'В корзину';
      } else {
        basketData.addToBasket(item);
        cardPreview.button = 'Удалить';
      }
      page.counter = basketData.getCardBasketAmount();
    }
  });

  if (item.price === null) {
    cardPreview.disableButton();
  } else {
    cardPreview.button = basketData.checkCardinBasket(item.id) ? 'Удалить' : 'В корзину';
  }

  modal.render({content: cardPreview.render(item)});
})

events.on('basket: open', () => {
  const basketItems = basketData.items.map((item, index) => {
    const basketItem = new CardViewInBasket(cloneTemplate(cardViewInBasketTemplate), {
      onClick: () => events.emit('basket: remove', item)
    })
    basketItem.index = index + 1;
    return basketItem.render(item);
  }); 
  modal.render({content: basket.render({
    items: basketItems,
    total: basketData.getPrice()
  })}); 
});

events.on('basket: remove', (item: TCardBasket) => {
  basketData.removeFromBasket(item.id);
  basketData.getPrice();
  const basketItems = basketData.items.map((item, index) => {
    const basketItem = new CardViewInBasket(cloneTemplate(cardViewInBasketTemplate), {
      onClick: () => events.emit('basket: remove', item)
    })
    basketItem.index = index + 1;
    return basketItem.render(item);
  });
  page.counter = basketData.getCardBasketAmount(); 
  modal.render({content: basket.render({
    items: basketItems,
    total: basketData.getPrice()
  })});
});

events.on('basket: submit', () => {
  events.emit('orderPaymentAddress: open');
});

events.on('orderPaymentAddress: open', () => {
  modal.render({content: payment.render({
    payment: '',
    address: '',
    valid: false,
    errors: []
  })});
});

events.on('formPaymentAddress: submit', () => {
  events.emit('orderEmailPhone: open');
});

events.on('orderEmailPhone: open', () => {
  modal.render({content: contacts.render({
    email: '',
    phone: '',
    valid: false,
    errors: []
  })});
});

events.on('formEmailPhone: submit', () => {
  basketData.getCardBasket();
  basketData.getPrice();
  api.postOrderCardsApi({
    payment: orederData.orderPayment.payment,
    address: orederData.orderPayment.address,
    email: orederData.orderContacts.email,
    phone: orederData.orderContacts.phone,
    items: basketData.getCardBasket(),
    total: basketData.getPrice(),
  })
  .then((res) => {
    events.emit('success: close', res);
    modal.render({content: success.render({total: res.amount})});
    orederData.clearOrderFirst();
    orederData.clearOrderSecond();
    basketData.clearBasket();
    page.counter = 0;
  })
  .catch(console.error);
});

events.on('success: close', () => {
  modal.closeModal();
})

events.on('formPaymentAddress: change', (errors: Partial<IOrderPayment>) => {
  const { payment, address } = errors;
  paymentdeliverly.valid = !payment && !address;
  paymentdeliverly.errors = Object.values({ payment, address }).filter(i => !!i).join('; ');
});

events.on(/^order\..*:change/, (data: { field: keyof IOrderPayment, value: string }) => {
  orederData.setOrderDataFirst(data.field, data.value);
});

events.on('formEmailPhone: change', (errors: Partial<IOrderContacts>) => {
  const { email, phone } = errors;
  contacts.valid = !email && !phone;
  contacts.errors = Object.values({ email, phone }).filter(i => !!i).join('; ');
});

events.on(/^contacts\..*:change/, (data: { field: keyof IOrderContacts, value: string }) => {
  orederData.setOrderDataSecond(data.field, data.value);
});

api.getCardsArrayApi()
  .then((res) => {
    cardsData.items = res;
    console.log(cardsData.items);
  })
  .catch(console.error);
  