import { Form } from "./Form";
import { IEvents } from "../base/events";
import { IOrderPayment } from "../../types/index";
import { ensureAllElements } from "../../utils/utils";

export class OrderFormPayment extends Form<IOrderPayment> {
  protected _buttons: HTMLButtonElement[];

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    this._buttons = ensureAllElements('.button_alt', container);
    this._buttons.forEach((button) => {
      button.addEventListener('click', () => {
        this.buttons = button.name;
        this.onInputChange('payment', button.name);
      });
    });
  }

  set buttons(name: string) {
    this._buttons.forEach((buttons) => {
      this.toggleClass(buttons, 'button_alt-active', buttons.name === name);
    });
  }

  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
  }

  clearButtons() {
    this._buttons.forEach((button) => {
      this.toggleClass(button, 'button_alt-active', false);
    });
  }
}
