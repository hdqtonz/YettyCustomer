import { Injectable } from '@angular/core';
import { CustomHttpParams } from '../class/customParams';
import { orderAPIEndpoints } from '../class/endpoints/orders';
import { Order } from '../interface/Order';
import { OrderItemRequest } from '../interface/OrderItemRequest';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private _http: HttpClientService) {}

  getTableVisitorOrder() {
    return this._http.get<Order>(`${orderAPIEndpoints._getTableVisitorOrder}`, {
      params: new CustomHttpParams(true),
    });
  }

  addVisitorOrder(reqBody: OrderItemRequest) {
    return this._http.post<any>(`${orderAPIEndpoints._addOrderItem}`, reqBody);
  }

  modifyVisitorOrderItem(reqBody: OrderItemRequest, orderId: string) {
    return this._http.put(
      `${orderAPIEndpoints._modifyOrderItem}/${orderId}`,
      reqBody
    );
  }

  removeVisitorOrderItem(orderId: string) {
    return this._http.delete(
      `${orderAPIEndpoints._removeOrderItem}/${orderId}`
    );
  }

  sendNotSentVisitorOrderItem() {
    return this._http.post(`${orderAPIEndpoints._sendNotSentOrderItems}`);
  }

  cancelSentVisitorOrderItem(orderId: string) {
    return this._http.delete(
      `${orderAPIEndpoints._cancelSentOrderItem}/${orderId}/cancel`
    );
  }
}
