import { ExtraOrderItem } from "./ExtraOrderItem"
import { OrderItem } from "./OrderItem"

export interface Order {
    orderItems: OrderItem[];
    extraOrderItems: ExtraOrderItem[];
    complete: boolean;  // default value false
}