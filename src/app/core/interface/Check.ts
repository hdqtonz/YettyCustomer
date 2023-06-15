import { CheckItem } from './CheckItem';
import { ExtraCheckItem } from './ExtraCheckItem';
import { ServiceCheckItem } from './ServiceCheckItem';

export interface Check {
  items: CheckItem[];
  extraItems: ExtraCheckItem[];
  discount: ServiceCheckItem[];
  service: ServiceCheckItem[];
  totalPrice: number;
}
