export class serviceAPIEndpoints {

  /**
   * tags: Service
   * summary: Returns if a service (waiter) has been requested by a table visitor
   * @type {string}
   */
  static _isServiceRequestedOnTable: string = "establishments/{{establishmentId}}/tables/{{tableId}}/visitors/{{visitorId}}/service";


  /**
   * tags: Service
   * summary: Requests service for a table visitor
   * @type {string}
   */
  static _requestServiceOnTable: string = "establishments/{{establishmentId}}/tables/{{tableId}}/visitors/{{visitorId}}/service";


  /**
   * tags: Service
   * summary: Cancels a service request for a table visitor
   * @type {string}
   */
  static _cancelServiceRequestOnTable: string = "establishments/{{establishmentId}}/tables/{{tableId}}/visitors/{{visitorId}}/service";
}
