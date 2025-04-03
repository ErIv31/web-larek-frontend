import { Component } from "../base/component";
import { IEvents } from "../base/events";
import { createElement, ensureElement, formatNumber } from "../../utils/utils";

interface IBasketView {
  items: HTMLElement[];
  total: number;
  selected: string[];
}

export class Basket extends Component<IBasketView> {  
  protected _list: HTMLElement;
  protected _button: HTMLButtonElement;
  protected _total: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._list = ensureElement<HTMLElement>('.basket__list', container);
    this._button = ensureElement<HTMLButtonElement>('.basket__button', container);
    this._total = ensureElement<HTMLElement>('.basket__price', container);
    this.items = [];

    if (this._button) {
      this._button.addEventListener('click', () => {
        this.events.emit('order:open');
      });
    } 
  }

  set items(items: HTMLElement[]) {
    if(items.length) {
      this._list.replaceChildren(...items);
      this.setDisabled(this._button, false);      
    } else {
      this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
        textContent: 'Корзина пуста'
      }));
      this.setDisabled(this._button, true);      
    };
  }
  
  set total(value: number) {
    this.setText(this._total, `${formatNumber(value)} синапсов`);
  }  
}
