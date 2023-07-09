import { Component, OnInit } from '@angular/core';
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

  chekbox = [
    { name: "Everyone's", ID: '1', checked: true },
    { name: 'Mine', ID: '2', checked: false },
  ];

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

  everyone: boolean = true;
  mine: boolean;
  onRadioButtonChange(event) {
    this.everyone = event.value;
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
        if (x.id === value.id) {
          this.checkedItems.splice(
            this.checkedItems.findIndex((y) => y.id == value.id),
            1
          );
        }
      });

      this.orderItemIds.forEach((x) => {
        this.orderItemIds.splice(
          this.checkedItems.indexOf((y) => y == value.id)
        ),
          1;
      });
    } else {
      this.checkedItems.push(value);
      this.orderItemIds.push(value.orderItemId);
    }
    console.log(this.orderItemIds, 'orderItemIds');
    console.log(this.checkedItems, 'checkedItems');
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

  initializePaymentRequest() {
    const reqBody = new OrderItemsPaymentRequest();
    reqBody.items = [];
    this.checkedItems.forEach((x) => {
      reqBody.items.push(this.initializePaymentItems(x));
    });
    reqBody.extraItems = [];

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
        console.log(this.paymentMethodsSettings, 'paymentMethodsSettings');
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
}
