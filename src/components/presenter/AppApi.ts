import { Api, ApiListResponse, ApiPostMethods } from "../base/api";
import { ICard, IOrder, IOrderResult } from "../../types/index";

export interface IAppApi {
  getCardApi(id: string): Promise<ICard>;
  getCardsArrayApi(): Promise<ICard[]>;
  postOrderCardsApi(order: IOrder): Promise<IOrderResult>;
}

export class AppApi extends Api implements IAppApi {
  readonly cdn: string;
  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getCardApi(id: string): Promise<ICard> {
      return this.get(`/product/${id}`).then((item: ICard) => ({...item, image: this.cdn + item.image}));
  }

  getCardsArrayApi(): Promise<ICard[]> {
      return this.get('/product/').then((data: ApiListResponse<ICard>) => data.items.map((item) => ({...item, image: this.cdn + item.image})));
  }

  postOrderCardsApi(order: IOrder): Promise<IOrderResult> {
      return this.post('/order', order).then((data: IOrderResult) => data);
  }
}
