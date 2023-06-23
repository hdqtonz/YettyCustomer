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
        console.log(this.orders, 'visitor order');
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err?.errorMessage);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onClickEditOrder() {

  }

  onClickRemoveOrder() {

  }
}
