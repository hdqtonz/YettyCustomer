export class paymentAPIEndpoints {

  /**
   * tags: Payment
   * summary: Lists the available payment methods for an establishment
   * @type {string}
   */
  static _listEstablishmentPaymentMethods: string = "establishments/{establishmentId}/payment-methods";


  /**
   * tags: Payment
   * summary: Returns the settings of the available payment methods for an establishment which are required to load provider-specific scripts
   * @type {string}
   */
  static _getEstablishmentPaymentMethodsSettings: string = "establishments/{establishmentId}/payment-methods-settings";


  /**
   * tags: Payment
   * summary: Calculates the price of selected order items of a table visitor before a payment request is submitted
   * @type {string}
   */
  static _calculateOrderItemsPrice: string = "establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}/calculate-order-items-price";


  /**
   * tags: Payment
   * summary: Requests the payment of a table visitor's order items
   * @type {string}
   */
  static _requestOrderItemsPayment: string = "establishments/{establishmentId}/tables/{tableId}/visitors/{visitorId}/payment-requests";


  /**
   * tags: PaypalPayments
   * summary: Confirms the payment of a PayPal order
   * @type {string}
   */
  static _confirmPayPalOrderPayment: string = "establishments/{establishmentId}/tables/{tableId}/payments/paypal/orders";


  /**
   * tags: PaypalPayments
   * summary: Cancels the payment of a PayPal order
   * @type {string}
   */
  static _cancelPayPalOrderPayment: string = "establishments/{establishmentId}/tables/{tableId}/payments/paypal/orders";


  /**
   * tags: EpayPayments
   * summary: Sets the status of an epay payment
   * @type {string}
   */
  static setEpayPaymentStatus: string = "payments/epay";
}
