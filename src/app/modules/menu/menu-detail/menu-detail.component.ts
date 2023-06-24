import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../menu.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { LocalStorage } from 'src/app/core/class/local-storage';
import { ImagePath } from 'src/app/core/config/imagepth.config';
import { AppRoute } from 'src/app/core/class/app-route';
import { MenuItem, OrderItemRequest } from '../manu';
import { OrdersService } from 'src/app/core/services/orders.service';
import { BaseComponent } from 'src/app/core/class/base-component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.scss'],
})
export class MenuDetailComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  appRoute = AppRoute;
  public menuDetails: MenuItem;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    private _menuService: MenuService,
    private _imagePath: ImagePath,
    private _localStorageService: LocalStorageService,
    private _cdr: ChangeDetectorRef,
    private _orderService: OrdersService
  ) {
    super(_matSnackBar);
  }

  ngOnInit(): void {
    this._menuService.menuDetailInfo.subscribe((item) => {
      this.menuDetails = item;
      console.log(this.menuDetails, 'menuDetails');
    });
  }

  ngOnDestroy(): void {
    this._localStorageService.removeKey(LocalStorage.MenuDetail);
  }

  /**
   * Get Images
   * @param image
   * @returns
   */
  getImage(image: string) {
    return this._imagePath.getImage(image);
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

  /**
   * Payload initializer
   * @param item
   * @returns
   */
  initializeAddItmeValue(item: MenuItem) {
    const orderItemRequest = new OrderItemRequest();
    orderItemRequest.menuItemId = item.id;
    orderItemRequest.menuItemSizeId = this.getSlectedSize(item);
    orderItemRequest.comment = '';
    return orderItemRequest;
  }

  /**
   *  Add Item
   * @param item
   * @returns
   */
  onAddItem(item) {
    if (!Object.keys(item).length) {
      return;
    }
    // API call
    this._orderService
      .addVisitorOrder(this.initializeAddItmeValue(item))
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.showMessage('Item added successfully');
        },
        error: (err) => {
          this.showError(err?.message);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  /**
   * To Get Selected Size
   * @param item
   * @returns
   */
  getSlectedSize(item) {
    let ele: any = document.getElementsByName(item.id);
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        let SelectedSize = ele[i].value;
        // just for testing
        item.sizes.forEach((e) => {
          if (e.id == SelectedSize) {
            console.log(e.name + ' : ' + SelectedSize);
          }
        });
        return ele[i].value;
      }
    }
  }

  /**
   * To Get Selected Size
   * @param item
   * @returns
   */
  displayPriceBasedOnSize(id) {
    let ele: any = document.getElementById(id);
    if (ele?.checked) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * To Handle Changes
   */
  handleChange() {
    this._cdr.detectChanges();
  }
}
