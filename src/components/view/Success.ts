import { Component } from "../base/component";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

interface ISuccess {
  total: number;
}

export class Success extends Component<ISuccess> {
  protected _title: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this._title = ensureElement<HTMLElement>('.order-success__title', container);
    this._total = ensureElement<HTMLElement>('.order-success__description', container);
    this._button = ensureElement<HTMLButtonElement>('.order-success__close, container');
    this._button.addEventListener('click', () => {
      this.events.emit('success: close');
    });
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set total(value: HTMLElement) {
    this.setText(this._total, `Списано ${value} синапсов`);
  }
}
