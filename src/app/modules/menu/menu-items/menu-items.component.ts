import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../core/class/base-component';
import { ImagePath } from '../../../core/config/imagepth.config';
import { MealSizeEnum } from '../../../core/enum/MealSizeEnum';
import { MenuSectionFullInfo } from '../../../core/interface/MenuSectionFullInfo';
import { MenuSections } from '../../../core/interface/MenuSections';
import { EstablishmentsService } from '../../../core/services/establishments.service';
import { OrdersService } from '../../../core/services/orders.service';
import { MenuItem, OrderItemRequest } from '../manu';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent extends BaseComponent implements OnInit {
  //other variable
  mealSize = MealSizeEnum;

  // Data variable
  public menuSection!: MenuSections;
  public selectedMenus: string[] = [];
  public menuSectionInfo: MenuSectionFullInfo[] = [];

  constructor(
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    private _estblishmentsService: EstablishmentsService,
    private _orderService: OrdersService,
    private _imagePath: ImagePath,
    private _cdr: ChangeDetectorRef
  ) {
    super(_matSnackBar);
    this.getEstblishmentsMenuSections();
  }

  ngOnInit(): void {}

  menuType: string = 'grid' || 'tile';

  /**
   * Get Estblishments Menu Section
   */
  getEstblishmentsMenuSections() {
    this.isLoading = true;
    this._estblishmentsService.getEstablishmentMenuSections().subscribe({
      next: (res: MenuSections) => {
        this.menuSection = res;
        this.onSelectMenuSection(this.menuSection.sections[0].id);
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

  onSelectMenuSection(menuSectionId: string | undefined) {
    if (this.selectedMenus.includes(menuSectionId)) {
      this.selectedMenus.forEach((item, index) => {
        if (item == menuSectionId) this.selectedMenus.splice(index, 1);
      });
    } else {
      this.selectedMenus.push(menuSectionId);
    }

    if (
      this.menuSectionInfo &&
      this.menuSectionInfo.filter((x) => x.id == menuSectionId).length > 0
    ) {
      this.menuSectionInfo = this.menuSectionInfo.filter(
        (x) => x.id != menuSectionId
      );
    } else {
      this._estblishmentsService
        .getEstablishmentMenuSectionItems(menuSectionId ?? '')
        .subscribe({
          next: (res: MenuSectionFullInfo) => {
            this.menuSectionInfo.push(res);
            console.log(this.menuSectionInfo);
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
  }

  /**
   * Get Images
   * @param image
   * @returns
   */
  getImage(image: string) {
    return this._imagePath.getImage(image);
  }

  /*menuItems = [
    {
      id: 0,
      name: 'Spaghetti',
      imgUrl: 'assets/images/menu-spaghetti.png',
      detail: 'lorem ipsum dolors it amet constuas elit cosnat uiqnsd',
      price: '12.05',
    },
    {
      id: 1,
      name: 'Capellini',
      imgUrl: 'assets/images/menu-fettuccine.png',
      detail: 'lorem ipsum dolors it amet constuas elit cosnat uiqnsd',
      price: '11.05',
      available: false,
    },
    {
      id: 2,
      name: 'Capellini',
      imgUrl: 'assets/images/menu-fettuccine.png',
      detail: 'lorem ipsum dolors it amet constuas elit cosnat uiqnsd',
      price: '11.05',
    },
    {
      id: 3,
      name: 'Spaghetti',
      imgUrl: 'assets/images/menu-spaghetti.png',
      detail: 'lorem ipsum dolors it amet constuas elit cosnat uiqnsd',
      available: false,
      price: '12.05',
    },
    {
      id: 4,
      name: 'Capellini',
      imgUrl: 'assets/images/menu-fettuccine.png',
      detail: 'lorem ipsum dolors it amet constuas elit cosnat uiqnsd',
      price: '11.05',
    },
    {
      id: 5,
      name: 'Spaghetti',
      imgUrl: 'assets/images/menu-spaghetti.png',
      detail: 'lorem ipsum dolors it amet constuas elit cosnat uiqnsd',
      price: '12.05',
    },
    {
      id: 6,
      name: 'Spaghetti',
      imgUrl: 'assets/images/menu-spaghetti.png',
      detail: 'lorem ipsum dolors it amet constuas elit cosnat uiqnsd',
      price: '12.05',
    },
    {
      id: 7,
      name: 'Spaghetti',
      imgUrl: 'assets/images/menu-spaghetti.png',
      detail: 'lorem ipsum dolors it amet constuas elit cosnat uiqnsd',
      price: '12.05',
    },
  ];*/

  onAddItem(item) {
    let data = this.initializeAddItmeValue(item);
    // API call below
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
    //return orderItemRequest;

    this._orderService.addVisitorOrder(orderItemRequest).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        console.log(res, 'Item added');
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

  handleChange() {
    this._cdr.detectChanges();
  }
}
