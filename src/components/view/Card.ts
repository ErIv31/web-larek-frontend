import { Component } from "../base/component";
import { IProduct } from "../../types/index";
import { ensureElement, formatNumber } from "../../utils/utils";

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface ICard<T> {
  category: string;
  title: string;
  image: string;
  price: number | null;
  description?: string;
  index?: number;
}

export class Card<T> extends Component<ICard<T>> {
  protected _category?: HTMLElement;
  protected _title: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _price: HTMLElement;
  protected _description?: HTMLElement;
  protected _button?: HTMLButtonElement;


  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._category = container.querySelector('.card__category');
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._price = ensureElement<HTMLElement>('.card__price', container);
    this._description = container.querySelector('.card__description');
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
    this.setText(this._price, value ? `${value.toString()} синапсов` : `Бесценно`);
  }
}

export class CardViewPreview extends CardView {
  protected _category?: HTMLElement;
  protected _description?: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _button: HTMLButtonElement;
  protected CardCategory: Record<string, string> = {
    'софт-скил': '_soft',
    'хард-скил': '_hard',
    'другое': '_other',
    'дополнительное': '_additional',
    'кнопка': '_button'
  };

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this._category = container.querySelector('.card__category');
    this._description = container.querySelector('.card__text');
    this._image = container.querySelector('.card__image');
    this._button = container.querySelector('.button');

    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }

  set category(value: string) {
    this._category.textContent = value;
    this._category.className = '';
    this._category.classList.add(this._category.classList[0]);
    this._category.classList.add(`this._category.classList[0]${this.CardCategory[value]}`);
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  set image(value: string) {
    this._image.src = value;
    this._image.alt = this._title.textContent;
  }

  set button(value: string) {
    this.setText(this._button, value);
  }

  disableButton() {
    this.setDisabled(this._button, true);
  }
}

export class CardViewArray extends CardView {
  protected _category?: HTMLElement;
  protected _image?: HTMLImageElement;
  protected CardCategory: Record<string, string> = {
    'софт-скил': '_soft',
    'хард-скил': '_hard',
    'другое': '_other',
    'дополнительное': '_additional',
    'кнопка': '_button'
  };

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this._category = container.querySelector('.card__category');
    this._image = container.querySelector('.card__image');

    if (actions?.onClick) {
      if (this._image) {
        this._image.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }

  set category(value: string) {
    this._category.textContent = value;
    this._category.className = '';
    this._category.classList.add(this._category.classList[0]);
    this._category.classList.add(`this._category.classList[0]${this.CardCategory[value]}`);
  }  

  set image(value: string) {
    this._image.src = value;
    this._image.alt = this._title.textContent;
  }
}

export class CardViewInBasket extends CardView {
  protected button?: HTMLButtonElement;
  protected _index: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.button = container.querySelector('.basket__item-delete');
    this._index = container.querySelector('.basket__item-index');

    if (actions?.onClick) {
      if (this.button) {
        this.button.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }

  set index(value: number) {
    this._index.textContent = value.toString();
  }
}
