import { Injectable } from '@angular/core';
import { paymentAPIEndpoints } from '../class/endpoints/payment';
import { OrderItemsPrice } from '../interface/OrderItemsPrice';
import { PaymentMethods } from '../interface/PaymentMethods';
import { PaymentMethodsSettings } from '../interface/PaymentMethodsSettings';
import { PaymentRequestResult } from '../interface/PaymentRequestResult';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _http: HttpClientService) { }

  getEstablishmentPaymentMethods() {
    return this._http.get<PaymentMethods>(`${paymentAPIEndpoints._listEstablishmentPaymentMethods}`);
  }

  getEstablishmentPaymentMethodsSettings() {
    return this._http.get<PaymentMethodsSettings>(`${paymentAPIEndpoints._getEstablishmentPaymentMethodsSettings}`);
  }

  calculateOrderItemsPrice() {
    return this._http.post<OrderItemsPrice>(`${paymentAPIEndpoints._calculateOrderItemsPrice}`);
  }

  requestOrderItemsPayment() {
    return this._http.post<PaymentRequestResult>(`${paymentAPIEndpoints._requestOrderItemsPayment}`);
  }

  confirmPayPalOrderPayment(orderId: string) {
    return this._http.post(`${paymentAPIEndpoints._confirmPayPalOrderPayment}/${orderId}`);
  }

  cancelPayPalOrderPayment(orderId: string) {
    return this._http.delete(`${paymentAPIEndpoints._cancelPayPalOrderPayment}/${orderId}`);
  }

  setEpayPaymentStatus() {
    return this._http.post(`${paymentAPIEndpoints.setEpayPaymentStatus}`)
  }
}
