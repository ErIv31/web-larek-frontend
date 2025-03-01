import { Component } from "../base/component";
import { ICard } from "../../types/index";
import { ensureElement } from "../../utils/utils";

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class CardView extends Component<ICard> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._price = ensureElement<HTMLElement>('.card__price', container);
  } 

  set title(value: string) {
    this.setText(this._title, value);
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
