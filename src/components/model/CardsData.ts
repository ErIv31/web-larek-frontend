import { Model } from "../base/model";
import { ICard } from "../../types/index";

export class CardsData extends Model <ICard> {
  protected _items: ICard[] = [];
  protected _preview: string | null;

  getCardArray() {
    return this._items;
  }

  getCard(itemId: string) {
    return this._items.find(item => itemId === item.id);
  }
  
  set items(items: ICard[]) {
    this._items = items;
    this.events.emit('cardsList: changed');
  }
    
  set preview(itemId: string | null) {
    if(!itemId) {
      this._preview = null;
      return;
    }

    const selectCard = this.getCard(itemId);
    
    if(selectCard) {
      this._preview = itemId;
      this.events.emit('card: select', selectCard);
    }
  }

  get preview() {
    return this._preview;
  }  
}
