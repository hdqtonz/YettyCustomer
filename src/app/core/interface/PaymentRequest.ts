import { PaymentRequestExtraOrderItem } from './PaymentRequestExtraOrderItem';
import { PaymentRequestOrderItem } from './PaymentRequestOrderItem';

export interface PaymentRequest {
  id: string;
  visitorId: string;
  visitor: string;
  type: string;
  itemsPrice: number;
  servicePrice: number;
  discount: number;
  totalPrice: number;
  paid: boolean;
  requestedDate: string;
  paidDate: string;
  orderItems: PaymentRequestOrderItem[];
  extraOrderItems: PaymentRequestExtraOrderItem[];
}
