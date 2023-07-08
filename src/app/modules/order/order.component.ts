import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../../core/class/base-component';
import { Order } from '../../core/interface/Order';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent extends BaseComponent implements OnInit {
  // Data variable
  public orders: Order;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _orderService: OrdersService
  ) {
    super(_matSnackBar);
  }

  ngOnInit(): void {
    this.getVisitorOrder();
  }

  getVisitorOrder() {
    this.isLoading = true;
    this._orderService.getTableVisitorOrder().subscribe({
      next: (res: Order) => {
        this.orders = res;
        this.isLoading = false;
        console.log(this.orders, 'visitor order');
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

  onClickEditOrder() {

  }

  onClickRemoveOrder(orderId) {
    this.isLoading = true;
    this._orderService.removeVisitorOrderItem(orderId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.showMessage('Item removed successfully');
        this.isLoading = false;
        this.getVisitorOrder();
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err?.errorMessage);
      },
      complete: () => {
        this.isLoading = false;
      },
    })
  }
}
