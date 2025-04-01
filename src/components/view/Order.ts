import { Form } from "./Form";
import { IEvents } from "../base/events";
import { IOrder } from "../../types/index";
import { ensureAllElements } from "../../utils/utils";

export type PaymentActions = {
  onClick: (payment: string) => void;
}

export class Order extends Form<IOrder> {
  protected _buttons: HTMLButtonElement[];

  constructor(container: HTMLFormElement, events: IEvents, actions?: PaymentActions) {
    super(container, events);

    this._buttons = ensureAllElements('.button_alt', container);

    this._buttons.forEach(button => {
      button.addEventListener('click', () => {
        actions?.onClick?.(button.name);
      });
    });
  }

  set selected(name: string) {
    this._buttons.forEach((button) => {
      this.toggleClass(button, 'button_alt-active', button.name === name);
    });
  }

  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
  }
}
