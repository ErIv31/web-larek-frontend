import { Component } from "../base/component";
import { ensureElement, formatNumber } from "../../utils/utils";

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface ICard {
  category: string;
  title: string;
  image: string;
  price: number | null;
  description?: string;
  index?: number;
}

export class Card extends Component<ICard> {
  protected _category?: HTMLElement;
  protected _title: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _price: HTMLElement;
  protected _description?: HTMLElement;
  protected _button?: HTMLButtonElement;
  protected _index?: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._category = container.querySelector('.card__category');
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._image = container.querySelector('.card__image');
    this._price = ensureElement<HTMLElement>('.card__price', container);    
    this._button = container.querySelector('.card__button');    

    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }
  
  set category(value: string) {
    this.setText(this._category, value);
    switch (value) {
      case 'софт-скил':
        this._category.classList.add('card__category_soft');
        break;
      case 'хард-скил':
        this._category.classList.add('card__category_hard');
        break;
      case 'другое':
        this._category.classList.add('card__category_other');
        break;
      case 'дополнительное':
        this._category.classList.add('card__category_additional');
        break;
      case 'кнопка':
        this._category.classList.add('card__category_button');
        break;  
    }
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  get title(): string {
    return this._title.textContent || '';
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }

  set price(value: number | null) {
    if (value !== null) {
      this.setText(this._price, `${formatNumber(value)} синапсов`);
      this.setDisabled(this._button, false);
    } else {
      this.setText(this._price, 'Бесценно');
      this.setDisabled(this._button, true);
    }    
  }
}

export class CardPreview extends Card {
  protected _description: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container, actions);

    this._description = ensureElement<HTMLElement>('.card__text', container);
  }

  set description(value: string | string[]) {
    this.setText(this._description, value);
  }

  toggleButton(value: boolean) {
    if (value) {
      this.setText(this._button, 'Удалить'); 
    } else {
      this.setText(this._button, 'В корзину');
    }
  }
}

export class CardBasket extends Card {
  protected _index: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container, actions);

    this._index = ensureElement<HTMLElement>('.basket__item-index', container);
  }

  set index(value: string) {
    this.setText(this._index, String(value));
  }
}
