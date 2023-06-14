import { OrderItemPaymentStatusEnum } from "../enums/OrderItemPaymentStatusEnum";
import { OrderItemStatusEnum } from "../enums/OrderItemStatusEnum";

export interface OrderItem {
    id: string;
    visitorId: string;
    visitor: string;
    menuItemId: string;
    menuItem: string;
    menuItemSizeId: string;
    menuItemSize: string;
    quantity: number;
    price: number;
    comment: string;
    status: OrderItemStatusEnum;
    paymentStatus: OrderItemPaymentStatusEnum;
}