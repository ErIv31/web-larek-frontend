import { Component } from "../base/component";
import { IEvents } from "../base/events";
import { createElement, ensureElement } from "../../utils/utils";

interface IBasket {
  items: HTMLElement;
  total: number;
}

export class Basket extends Component<IBasket> {
  protected _title: HTMLElement;
  protected _basketList: HTMLElement;
  protected _basketButton: HTMLButtonElement;
  protected _total: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this._title = ensureElement<HTMLElement>('.modal__title', container);
    this._basketList = ensureElement<HTMLElement>('.basket__list', container);
    this._basketButton = ensureElement<HTMLButtonElement>('.basket__button', container);
    this._total = ensureElement<HTMLElement>('.basket__price', container);
    this.items = [];
    this._basketButton.addEventListener('click', () => {this.events.emit('basket: submit');})
  }

  set items(items: HTMLElement[]) {
    if(items.length) {
      this._basketList.replaceChildren(...items);
      this._basketButton.removeAttribute('disablesd');
    } else {
      this._basketList.replaceChildren(createElement<HTMLParagraphElement>('p', {textContent: 'Корзина пуста'}));
    };
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set basketList(value: HTMLElement[]) {
    this.items = value;
  }

  set total(value: number) {
    this.setText(this._total, `${value} синапсов`);
  }

  updateIndexList() {
    Array.from(this._basketList.children).forEach((item, index) => (item.querySelector('.basket__item-index')!.textContent = (index + 1).toString()));
  }
}
