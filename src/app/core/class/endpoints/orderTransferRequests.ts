export class orderTransferRequestAPIEndpoints {

  /**
   * tags: OrderTransferRequests
   * summary: Returns the order items transfer requests to a table visitor
   * @type {string}
   */
  static _listTableVisitorTransferRequests: string = "establishments/{{establishmentId}}/tables/{{tableId}}/visitors/{{visitorId}}/order-items-transfer-requests"


  /**
   * tags: OrderTransferRequests
   * summary: Requests the transferring of order items from a table visitor to another one
   * @type {string}
   */
  static _requestOrderItemsTransfer: string = "establishments/{{establishmentId}}/tables/{{tableId}}/visitors/{{visitorId}}/order-items-transfer-requests"


  /**
   * tags: OrderTransferRequests
   * summary: Confirms the transferring of order items from a table user to another one
   * @type {string}
   */
  static _confirmOrderItemsTransfer: string = "establishments/{{establishmentId}}/tables/{{tableId}}/visitors/{{visitorId}}/order-items-transfer-requests/{{transferRequestId}}"


  /**
   * tags: OrderTransferRequests
   * summary: Declines the transferring of order items from a table user to another one
   * @type {string}
   */
  static _declineOrderItemsTransfer: string = "establishments/{{establishmentId}}/tables/{{tableId}}/visitors/{{visitorId}}/order-items-transfer-requests/{{transferRequestId}}"


  /**
   * tags: Check
   * summary: Returns the check for a table user
   * @type {string}
   */
  static _getTableCheck: string = "establishments/{{establishmentId}}/tables/{{tableId}}/visitors/{{visitorId}}/check";
}
