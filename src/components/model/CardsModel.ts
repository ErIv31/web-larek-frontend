import { Model } from "../base/model";
import { IAppState, IProduct } from "../../types/index";

export class CardsData extends Model <IAppState> {
  preview: string | null;

  setPreview(item: IProduct) {
    this.preview = item.id;
    this.emitChanges('preview:changed', item);
  }
  
}
