import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'order',
  pure: false,
})
export class OrderPipe implements PipeTransform {
  private orders: any = [];
  transform(value: any, ...args: any[]): any {
    if (value !== undefined && value !== null) {
      return _.uniqBy(value, 'menuItemId');
    }
    return value;
  }
}
