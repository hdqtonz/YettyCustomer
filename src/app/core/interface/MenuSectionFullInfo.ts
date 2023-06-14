import { MenuItem } from "./MenuItem";

export interface MenuSectionFullInfo {
    description: string;
    id:          string;
    menuItems:   MenuItem[];
    name:        string;
}