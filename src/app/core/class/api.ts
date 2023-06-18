export class Api {
  /**
   * API EstablishmentsSetting
   * @type {string}
   */
  static _getEstablishmentsSettingMain: string = `establishments/{establishmentId}/settings`;

  /**
   * API Establishments Setting Test
   * @type {string}
   */
  static _getEstablishmentsSetting: string = `establishments/{establishmentId}/settings`;

  /**
   * API Establishments General Information Test
   * @type {string}
   */
  static _getEstablishmentsGeneralInfo: string = `establishments/{establishmentId}/info`;

  /**
   *  API Establishments Table Information ById Test
   * @type {string}
   */
  static _getEstablishmentsTableInfo: string = `establishments/{establishmentId}/tables`;
  /**
   *  Api For add Visitor To Table By Table id
   * @type {string}
   */
  static _addVisitorToTable: string = `establishments/{establishmentId}/tables`;

  /**
   * Api For get
   * @type {string}
   */
  static _getEstablishmentMenuSections: string = `establishments/{establishmentId}/menu/sections`;

  /**
   * Api For get
   * @type {string}
   */
  static _getEstablishmentMenuSectionItems: string = `establishments/{establishmentId}/menu/sections/{menuSectionId}`;

  /**
   * Api For (Get)
   * summary: Returns if a service (waiter) has been requested by a table visitor
   * @type {string}
   */
  static _isServiceRequestedOnTable: string =
    'establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}/service';

  /**
   * Api For (Post)
   * summary: Requests service for a table visitor
   * @type {string}
   */
  static _requestServiceOnTable: string =
    'establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}/service';

  /**
   * tags: Api For (Delete)
   * summary: Cancels a service request for a table visitor
   * @type {string}
   */
  static _cancelServiceRequestOnTable: string =
    'establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}/service';
}
