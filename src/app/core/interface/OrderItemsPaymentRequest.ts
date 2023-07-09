import { OrderItemPaymentRequest } from './OrderItemPaymentRequest';

export class OrderItemsPaymentRequest {
  items: OrderItemPaymentRequest[];
  extraItems: OrderItemPaymentRequest[];
  type: string;
}
