import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../../core/class/base-component';
import { Order } from '../../core/interface/Order';
import { OrdersService } from '../../core/services/orders.service';
import { OrderItemRequest } from '../menu/manu';
import { OrderItemStatusEnum } from 'src/app/core/enum/OrderItemStatusEnum';
import { Router } from '@angular/router';
import { AppRoute } from 'src/app/core/class/app-route';
import { AccountService } from 'src/app/core/services/account.service';
import { EstablishmentTable } from 'src/app/core/interface/Table';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { LocalStorage } from 'src/app/core/class/local-storage';
import { EstablishmentsService } from 'src/app/core/services/establishments.service';
import { MenuItemObj } from './order';
import { TransferOrderItemsRequest } from 'src/app/core/interface/TransferOrderItemsRequest';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent extends BaseComponent implements OnInit {
  // Others
  orderStatus = OrderItemStatusEnum;
  AppRoute = AppRoute;

  // Data variable
  public orders: Order;
  public comment: string = '';
  public editOrderData: any;

  // Order Data Variable
  public newOrders: any = [];
  public sentOrders: any = [];
  public confirmedOrders: any = [];
  public servedOrders: any = [];
  public tableInfo!: EstablishmentTable;
  public TableId: string;
  public visitorId: string;
  public orderItemsTrasferItem: any = [];
  public transferItems: MenuItemObj[] = [];

  // Total section variables
  public isNewOrderAvailable: boolean;
  public isSentOrderAvailable: boolean;
  public isConfirmedOrderAvailable: boolean;
  public isServedOrderAvailable: boolean;

  public taxFee: number = 8.3;
  public voucher: number = 7;
  public selectedVisitor: string;

  @ViewChild('closebutton') PrefCloseButton: ElementRef;
  @ViewChild('closebutton1') PrefCloseButton1: ElementRef;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _orderService: OrdersService,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _accountService: AccountService,
    private _localStorageService: LocalStorageService,
    private _estblishmentsService: EstablishmentsService
  ) {
    super(_matSnackBar);

    // To Show Some order page
    this._accountService.visotorIdInfo.subscribe((visitorId) => {
      if (!visitorId) {
        this.navigateTo(AppRoute.Home);
      }
    });

    this.TableId =
      this._localStorageService.getItem(LocalStorage.TABLE_ID) ?? '';

    // To Show Some order page
    this._accountService.visotorIdInfo.subscribe((visitorId) => {
      this.visitorId = visitorId;
    });
  }

  ngOnInit(): void {
    this.getVisitorOrder();
    this.getEstablishmentsTableInfo();
  }

  /**
   * Get Establishments Table Info
   */
  getEstablishmentsTableInfo() {
    if (!this.TableId) {
      this.navigateTo(AppRoute.Landing);
      return;
    }
    this.isLoading = true;
    this._estblishmentsService
      .getEstablishmentsTableInfo(this.TableId)
      .subscribe({
        next: (res: EstablishmentTable) => {
          this.tableInfo = res;
          // setting up customer count
          this.isLoading = false;
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

  /**
   * Get Visitro Orders
   */
  getVisitorOrder() {
    this.sentOrders = [];
    this.newOrders = [];
    this.confirmedOrders = [];
    this.servedOrders = [];

    this.isLoading = true;
    this._orderService.getTableVisitorOrder().subscribe({
      next: (res: Order) => {
        this.orders = res;
        if (!this.orders.orderItems.length) {
          // this.navigateTo(this.AppRoute.Menu +'/'+ this.AppRoute.Item);
        }
        this.getNewOrders(this.orders);
        this.getSentOrders(this.orders);
        this.getConfirmedOrder(this.orders);
        this.getServedOrder(this.orders);
        this._cdr.detectChanges();
        this.isLoading = false;
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

  /**
   * Get new orders
   * @param orders
   */
  getNewOrders(orders) {
    orders.orderItems.forEach((x) => {
      if (x.status == this.orderStatus.ADDED) {
        this.newOrders.push(x);
      }
    });

    this.isNewOrderAvailable = this.newOrders.length ? true : false;
  }

  /**
   * Get sent orders
   * @param orders
   */
  getSentOrders(orders) {
    orders.orderItems.forEach((x) => {
      if (x.status == 'SENT') {
        this.sentOrders.push(x);
      }
    });

    this.isSentOrderAvailable = this.sentOrders.length ? true : false;
  }

  /**
   * Get confirmed orders
   * @param orders
   */
  getConfirmedOrder(orders) {
    orders.orderItems.forEach((x) => {
      if (x.status == this.orderStatus.CONFIRMED) {
        this.confirmedOrders.push(x);
      }
    });

    this.isConfirmedOrderAvailable = this.confirmedOrders.length ? true : false;
  }

  /**
   * Get seved order
   * @param orders
   */
  getServedOrder(orders) {
    orders.orderItems.filter((x) => {
      if (x.status == this.orderStatus.SERVED) {
        this.servedOrders.push(x);
      }
    });

    this.isServedOrderAvailable = this.servedOrders.length ? true : false;
  }

  /**
   * To Get Subtotal
   * @param orders
   * @returns
   */
  getSubTotal(orders) {
    return orders.reduce((subTotal, x) => subTotal + x.price, 0).toFixed(2);
  }

  /**
   * To Get Total
   * @param orders
   * @returns
   */
  getTotal(orders) {
    let subTotal = orders.reduce((subTotal, x) => subTotal + x.price, 0);
    let total = subTotal + this.voucher + this.taxFee;
    return total.toFixed(2);
  }

  /**
   * Manage Popup Value
   * @param menuItem
   */
  onClickEditOrder(menuItem: any) {
    this.editOrderData = menuItem;
  }

  /**
   * Remove Oder Item
   * @param orderId
   */
  onClickRemoveOrder(orderId) {
    this.isLoading = true;
    this._orderService.removeVisitorOrderItem(orderId).subscribe({
      next: (res: any) => {
        this.showMessage('Item removed successfully');
        this.isLoading = false;
        this.getVisitorOrder();
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

  /**
   * Intialize Edit Order Payload
   * @returns
   */
  initializeEditOrderPayload() {
    const reqBody = new OrderItemRequest();
    reqBody.menuItemId = this.editOrderData.menuItemId;
    reqBody.menuItemSizeId = this.editOrderData.menuItemSizeId;
    reqBody.comment = this.comment;

    return reqBody;
  }

  /**
   * Edit Order Item
   * @returns
   */
  onSaveEditOrder() {
    let orderId = this.editOrderData.id;
    let data = this.initializeEditOrderPayload();
    if (!Object.entries(data).length) {
      return;
    }

    this._orderService.modifyVisitorOrderItem(data, orderId).subscribe({
      next: (res) => {
        this.showMessage('Item edited successfully');
        this.isLoading = false;
        this.getVisitorOrder();
        this.comment = '';
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err?.message);
      },
      complete: () => {
        this.PrefCloseButton.nativeElement.click();
        this.isLoading = false;
      },
    });
  }

  /**
   * Send All Oder
   */
  sendNotSentOrder() {
    this.isLoading = true;
    this._orderService.sendNotSentVisitorOrderItem().subscribe({
      next: (res: any) => {
        this.showMessage('Order sent successfully');
        this.isLoading = false;
        this.getVisitorOrder();
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

  /**
   * On Cancel Sent Order
   */
  cancelSentOrder(orderId: string) {
    this.isLoading = true;
    this._orderService.cancelSentVisitorOrderItem(orderId).subscribe({
      next: (res: any) => {
        this.showMessage('Order cancelled successfully');
        this.isLoading = false;
        this.getVisitorOrder();
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

  onCheckBoxChange(event, value) {
    let menuItemObj = new MenuItemObj();

    if (!event.checked) {
      this.orderItemsTrasferItem.forEach((x) => {
        if (x.id === value.id) {
          this.orderItemsTrasferItem.splice(
            this.orderItemsTrasferItem.findIndex((y) => y.id == value.id),
            1
          );
        }
      });

      if (this.transferItems.find((x) => x.menuItemId == value.menuItemId)) {
        let index = this.transferItems.findIndex(
          (x) => x.menuItemId == value.menuItemId
        );
        if (this.transferItems[index].count > 1) {
          this.transferItems[index].count -= 1;
          this.transferItems[index].price -= value.price;
        } else {
          this.transferItems.splice(index, 1);
        }
      } else {
        menuItemObj.menuItemId = value.menuItemId;
        menuItemObj.menuItem = value.menuItem;
        menuItemObj.price = value.price;
        menuItemObj.count = 1;
      }
    } else {
      if (this.transferItems.find((x) => x.menuItemId == value.menuItemId)) {
        let index = this.transferItems.findIndex(
          (x) => x.menuItemId == value.menuItemId
        );
        this.transferItems[index].count += 1;
        this.transferItems[index].price += value.price;
      } else {
        menuItemObj.menuItemId = value.menuItemId;
        menuItemObj.menuItem = value.menuItem;
        menuItemObj.price = value.price;
        menuItemObj.count = 1;
        this.transferItems.push(menuItemObj);
      }

      this.orderItemsTrasferItem.push(value);
    }
    this._cdr.detectChanges();
  }

  initializeTransferOderPayload() {
    const reqBody = new TransferOrderItemsRequest();
    reqBody.orderItemIds = this.orderItemsTrasferItem.map((x) => x.id);
    reqBody.extraOrderItemIds = [];
    reqBody.visitorId = this.selectedVisitor;

    return reqBody;
  }

  /**
   *
   * @returns
   */
  requestOrderItemsTransfer() {
    const reqBody = this.initializeTransferOderPayload();
    if (!this.orderItemsTrasferItem.length && !this.selectedVisitor.length) {
      this.showError('Please Select item');
      return;
    }
    this._orderService.requestOrderItemsTransfer(reqBody).subscribe({
      next: (res) => {
        this.showMessage('Oder transfer successfully');
        this.getVisitorOrder();
        this.isLoading = false;
      },
      error: (err) => {
        this.showError(err.message);
        this.isLoading = false;
      },
      complete: () => {
        this.PrefCloseButton1.nativeElement.click();
        this.isLoading = false;
      },
    });
  }

  /**
   * To navigate other pages
   * @param path
   */
  navigateTo(path: string) {
    this._router
      .navigate([path])
      .then((res) => {
        if (res) {
          this.scrollToTop();
        }
      })
      .catch((err) => {
        console.log(`Somting went wrong`);
      });
  }

  /**
   * To Scroll at Top
   */
  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
