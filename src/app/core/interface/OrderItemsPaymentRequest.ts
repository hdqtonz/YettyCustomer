import { PaymentTypeEnum } from '../enums/PaymentTypeEnum';
import { OrderItemPaymentRequest } from './OrderItemPaymentRequest';

export interface OrderItemsPaymentRequest {
  items: OrderItemPaymentRequest[];
  extraItems: OrderItemPaymentRequest[];
  type: PaymentTypeEnum;
}
