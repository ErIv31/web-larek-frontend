import { Component } from "../base/component";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected _content: HTMLElement;
  protected _closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this._content = ensureElement<HTMLElement>('.modal__content', container);
    this._content.addEventListener('click', (event) => event.stopPropagation());
    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
    this._closeButton.addEventListener('click', this.closeModal.bind(this));
    this.container.addEventListener('click', this.closeModal.bind(this));
  }

  openModal() {
    this.container.classList.add('modal_active');
    this.events.emit('modal: open');
  }

  closeModal() {
    this.container.classList.remove('modal_active');
    this.content = null;
    this.events.emit('modal: close');
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  render(data: IModal): HTMLElement {
    super.render(data);
    this.openModal();
    return this.container;
  }
}
