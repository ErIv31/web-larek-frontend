import { IEvents } from "../base/events";
import { Form } from "./Form";
import { IContactsForm } from "../../types/index";

export class Contacts extends Form<IContactsForm> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }

  set email(value: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
  }

  set phone(value: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
  }
}
