export class establishmentAPIEndpoints {

  /**
   * tags: Establishments
   * summary: Returns the settings of an establishment
   * @type {string}
   */
  static _getEstablishmentSettings: string = "establishments/{establishmentId}/settings";


  /**
   * tags: Establishments
   * summary: Returns general information of the establishment - name, description, contacts, supported languages, etc.
   * @type {string}
   */
  static _getEstablishmentInfo: string = "establishments/{establishmentId}/info";


  /**
   * tags: Establishments
   * summary: Returns the sections in the menu of the establishment
   */
  static _getEstablishmentMenuSections: string = "establishments/{establishmentId}/menu/sections";

  /**
   * tags: Establishments
   * summary: Returns the menu items in a section in the menu of the establishment
   * @type {string}
   */
  static _getEstablishmentMenuSectionItems: string = "establishments/{establishmentId}/menu/sections";
}
