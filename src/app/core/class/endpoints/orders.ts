export class orderAPIEndpoints {
  /**
   * tags: Orders
   * summary: Returns a table visitor's ordered menu items
   * @type {string}
   */
  static _getTableVisitorOrder: string =
    'establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}/order-items';

  /**
   * tags: Orders
   * summary: Adds a menu item to a table visitor's order
   * @type {string}
   */
  static _addOrderItem: string =
    'establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}/order-items';

  /**
   * tags: Orders
   * summary: Modifies a not yet sent order item in a table visitor's order
   * @type {string}
   */
  static _modifyOrderItem: string =
    'establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}/order-items';

  /**
   * tags: Orders
   * summary: Removes a not yet sent order item from a table visitor's order
   * @type {string}
   */
  static _removeOrderItem: string =
    'establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}/order-items';

  /**
   * tags: Orders
   * summary: Sends all not yet sent menu items in a table visitor's order to the establishment personnel for processing
   * @type {string}
   */
  static _sendNotSentOrderItems: string =
    'establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}/order-items/send';

  /**
   * tags: Orders
   * summary: Cancels a sent or, if the establishment settings permit it, a confirmed order item in a table visitor's order
   * @type {string}
   */
  static _cancelSentOrderItem: string =
    'establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}/order-items';
}
