import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../../../core/class/base-component';
import { Check } from '../../../core/interface/Check';
import { CheckService } from '../../../core/services/check.service';
import { OrderItemsPaymentRequest } from 'src/app/core/interface/OrderItemsPaymentRequest';
import { OrderItemPaymentRequest } from 'src/app/core/interface/OrderItemPaymentRequest';
import { PaymentService } from 'src/app/core/services/payment.service';
import { OrderItemsPrice } from 'src/app/core/interface/OrderItemsPrice';
import { PaymentMethods } from 'src/app/core/interface/PaymentMethods';
import { PaymentMethodsSettings } from 'src/app/core/interface/PaymentMethodsSettings';

declare let paypal: any;

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
})
export class CheckComponent extends BaseComponent implements OnInit {
  public check: Check;
  public checkedItems = [];
  public orderItemIds = [];
  public orderItemPrice: OrderItemsPrice;
  public paymentMethods: PaymentMethods;
  public paymentMethodsSettings: PaymentMethodsSettings;
  public selectedTotal: number = 0;

  chekbox = [
    { name: "Everyone's", ID: '1', checked: true },
    { name: 'Mine', ID: '2', checked: false },
  ];

  public finalAmount = 1;
  public currency = 'EUR';
  public addScript = false;
  public clientId: string = '';

  paypalConfig: any;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _checkService: CheckService,
    private _paymentService: PaymentService
  ) {
    super(_matSnackBar);
  }

  ngOnInit(): void {
    this.getCheckOrderList(true);
    this.getEstablishmentPaymentMethodsSettings();
  }

  onRadioButtonChange(event) {
    this.getCheckOrderList(event.value);
  }

  getCheckOrderList(value) {
    this.isLoading = true;
    this._checkService.getTableCheck(value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.check = res;
        console.log(res);
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err?.message);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onCheckboxChange(value, event) {
    if (!event.checked) {
      this.checkedItems.forEach((x) => {
        if (x.menuItemId === value.menuItemId) {
          this.checkedItems.splice(
            this.checkedItems.findIndex(
              (y) => y.menuItemId == value.menuItemId
            ),
            1
          );
        }
      });

      this.orderItemIds.forEach((x) => {
        this.orderItemIds.splice(
          this.checkedItems.indexOf((y) => y == value.menuItemId)
        ),
          1;
      });
    } else {
      this.checkedItems.push(value);
      this.orderItemIds.push(value.menuItemId);
    }

    this.selectedTotal = this.checkedItems.reduce(
      (total, x) => total + x.price,
      0
    );
  }

  onSelecteAll() {
    this.check.items.forEach((x) => {
      this.onCheckboxChange(x, { checked: true });
    });
  }

  onUnselecteAll() {
    this.check.items.forEach((x) => {
      this.onCheckboxChange(x, { checked: false });
    });
  }

  initializePaymentRequest(paymentType?) {
    const reqBody = new OrderItemsPaymentRequest();
    reqBody.items = [];
    this.checkedItems.forEach((x) => {
      reqBody.items.push(this.initializePaymentItems(x));
    });
    reqBody.extraItems = [];
    if (paymentType?.length) {
      reqBody.type = paymentType;
    }

    return reqBody;
  }

  initializePaymentItems(data) {
    const reqBody = new OrderItemPaymentRequest();
    reqBody.orderItemId = data.orderItemId;
    reqBody.visitorId = data.visitorId;

    return reqBody;
  }

  onPayment() {
    let data = this.initializePaymentRequest();
    if (!Object.entries(data).length) {
      this.showError('Please select item');
      return;
    }

    this._paymentService.calculateOrderItemsPriceReq(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.orderItemPrice = res;
        this.finalAmount = this.orderItemPrice.priceInBaseCurrency;
        this.getEstablishmentPaymentMethods();
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err.message);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getEstablishmentPaymentMethods() {
    this._paymentService.getEstablishmentPaymentMethods().subscribe({
      next: (res) => {
        this.paymentMethods = res;
        console.log(this.paymentMethods);
        console.table(this.paymentMethods);
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err.message);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getEstablishmentPaymentMethodsSettings() {
    this._paymentService.getEstablishmentPaymentMethodsSettings().subscribe({
      next: (res) => {
        this.paymentMethodsSettings = res;
        this.clientId = this.paymentMethodsSettings.payPalSettings.clientId;
        this.currency = this.paymentMethodsSettings.payPalSettings.currency;
        this.definedPaypalObj();
        this.definedPaypalmehtod();
        this.isLoading = false;
      },
      error: (err) => {
        this.showError(err.message);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  requestOrderItemsPayment(paymnet) {
    let data = this.initializePaymentRequest(paymnet);
    if (!Object.entries(data).length) {
      this.showError('Please select item');
      return;
    }

    this._paymentService.requestOrderItemsPayment(data).subscribe({
      next: (res) => {
        console.log(res, 'res');
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err.message);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  /* Paypay **/

  addPayPalScrinpt() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = `https://www.paypalobjects.com/api/checkout.js`;
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

  definedPaypalObj() {
    return (this.paypalConfig = {
      env: 'sandbox',
      client: {
        sandbox: this.clientId,
        production: '<your-produciton id>',
      },
      commit: true,
      payment: (data, actions) => {
        return actions.payment.create({
          payment: {
            transactions: [
              { amount: { total: this.finalAmount, currency: this.currency } },
            ],
          },
        });
      },
      onAuthorize: (data, actions) => {
        return actions.payment.execute().then((payment) => {
          // Do something when payment is successful
        });
      },
    });
  }
  definedPaypalmehtod() {
    if (!this.addScript) {
      this.addPayPalScrinpt().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
      });
    }
  }
}
