import { OrderItemPaymentRequest } from "./OrderItemPaymentRequest";

export interface OrderItemsProcessingRequest {
    items: OrderItemPaymentRequest[];
}