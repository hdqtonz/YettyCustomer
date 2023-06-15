import { TransferRequestExtraOrderItem } from './TransferRequestExtraOrderItem';
import { TransferRequestOrderItem } from './TransferRequestOrderItem';

export interface OrderItemsTransferRequest {
  id: string;
  sender: string;
  orderItems: TransferRequestOrderItem[];
  extraOrderItems: TransferRequestExtraOrderItem[];
  itemsPrice: number;
  servicePrice: number;
  discount: number;
  totalPrice: number;
}
