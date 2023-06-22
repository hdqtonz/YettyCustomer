import { MenuItemSize } from 'src/app/core/interface/MenuItemSize';

export class OrderItemRequest {
  menuItemId: string;
  menuItemSizeId: string;
  comment: string;
}

export class MenuItem {
  id: string;
  name: string;
  description: string;
  photos: string[];
  sizes: MenuItemSize[];
  allergens: string[];
  available: boolean;
}
