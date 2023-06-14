import { OrderItemPaymentStatusEnum } from "../enums/OrderItemPaymentStatusEnum"
import { OrderItemStatusEnum } from "../enums/OrderItemStatusEnum"

export interface ExtraOrderItem {
    id: string;
    visitorId: string;
    visitor: string;
    name: string;
    price: number;
    status: OrderItemStatusEnum;
    paymentStatus: OrderItemPaymentStatusEnum;
}