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
  static _getEstablishmentsSetting: string = `establishments/crazy-potato/settings`; // Todo establishmentId

  /**
   * API Establishments General Information Test
   * @type {string}
   */
  static _getEstablishmentsGeneralInfo: string = `establishments/crazy-potato/info`; // Todo establishmentId

  /**
   *  API Establishments Table Information ById Test
   * @type {string}
   */
  static _getEstablishmentsTableInfo: string = `establishments/crazy-potato/tables`; // Todo establishmentId (Need to pass table id)

  /**
   *  Api For add Visitor To Table By Table id
   * @type {string}
   */
  static _addVisitorToTable: string = `establishments/crazy-potato/tables`; // Todo establishmentId (Need to pass :id/visitors)

  /**
   * Api For get
   * @type {string}
   */
  static _getEstablishmentMenuSections: string = `establishments/crazy-potato/menu/sections`;

  /**
   * Api For get
   * @type {string}
   */
  static _getEstablishmentMenuSectionItems: string = `establishments/{establishmentId}/menu/sections/{menuSectionId}`;
}
