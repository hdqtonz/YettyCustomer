export class tableAPIEndpoints {

  /**
   * tags: Tables
   * summary: Returns information about a table
   * @type {string}
   */
  static _getTableInfo: string = "establishments/{{establishmentId}}/tables/{{tableId}}";


  /**
   * tags: Tables
   * summary: Adds a visitor to a table
   * @type {string}
   */
  static _addVisitorToTable: string = "establishments/{{establishmentId}}/tables/{{tableId}}/visitors";


  /**
   * tags: Tables
   * summary: Removes a visitor from a table
   * @type {string}
   */
  static _removeVisitorFromTable: string = "establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}";
}
