import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { PaypalService } from 'src/app/core/services/paypal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  public paymetTypes = ['PAYPAL', 'EPAY'];

  public finalAmount: number;
  public currency = 'EUR';
  public clientId: string = '';
  public paidFor: boolean = false;

  public ePayForm: FormGroup;

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  @ViewChild('paytmForm', { read: ElementRef }) paytmForm: ElementRef;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _checkService: CheckService,
    private _paymentService: PaymentService,
    private _paypalService: PaypalService
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
    if (!this.orderItemIds.length) {
      this.showError('Please select item');
      return;
    }

    this._paymentService.calculateOrderItemsPriceReq(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.orderItemPrice = res;
        this.finalAmount = this.orderItemPrice.priceInBaseCurrency;
        this.paypal();
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

  public settings: any;
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
  paypal() {
    this._paypalService.initiate(this.clientId, this.currency).subscribe(() =>
      paypal
        .Buttons({
          style: {
            layout: 'horizontal',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
            tagline: false,
          },
          // THE REST IS JUST TYPICAL PAYPAL BUTTON STUFF.
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  // description: this.product.description,
                  amount: {
                    currency_code: this.currency,
                    value: this.finalAmount,
                  },
                },
              ],
            });
          },

          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
          },
        })
        .render(this.paymentRef.nativeElement)
    );
  }

  /**
   * Epay
   */
  requestOrderItemEPay() {
    let data = this.initializePaymentRequest('EPAY');
    if (!Object.entries(data).length) {
      this.showError('Please select item');
      return;
    }
    this._paymentService.requestOrderItemEPay(data).subscribe({
      next: (res) => {
        this.settings = JSON.parse(res.paymentSettings);
        this.paytmForm.nativeElement.submit();
        this.isLoading = false;
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
  createEPayForm() {
    this.ePayForm = new FormGroup({
      PAGE: new FormControl(Validators.required),
      ENCODED: new FormControl(Validators.required),
      CHECKSUM: new FormControl(Validators.required),
      URL_OK: new FormControl(Validators.required),
      URL_CANCEL: new FormControl(Validators.required),
      LANG: new FormControl(Validators.required),
    });
  }
}
