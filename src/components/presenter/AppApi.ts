import { Api, ApiListResponse } from "../base/api";
import { IProduct, IOrder, IOrderResult } from "../../types/index";

export interface IAppApi {
  getProductList: () => Promise<IProduct[]>;
  postOrder: (order: IOrder) => Promise<IOrderResult>;
}

export class AppApi extends Api implements IAppApi {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getProductList(): Promise<IProduct[]> {
    return this.get(`/product`).then((data: ApiListResponse<IProduct>) => 
      data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image
      }))
    );
  }

  postOrder(order: IOrder): Promise<IOrderResult> {
    return this.post('/order', order).then(
      (data: IOrderResult) => data
    );
  }
}
