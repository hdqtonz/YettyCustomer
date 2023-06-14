import { MenuItemSize } from "./MenuItemSize"

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    photos: string[];
    sizes: MenuItemSize[];
    allergens: string[];
    available: boolean;
}