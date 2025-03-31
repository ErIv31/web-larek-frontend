import { Model } from "../base/model";
import { IAppState, IProduct } from "../../types/index";

export class CardsData extends Model <IAppState> {
  preview: string | null;
  catalog: IProduct[];

  setPreview(item: IProduct) {
    this.preview = item.id;
    this.emitChanges('preview:changed', item);
  }

  setCatalog(items: IProduct[]) {
    this.catalog = Object.values(items);
    this.emitChanges('items:changed', { catalog: this.catalog });
  }    
}
