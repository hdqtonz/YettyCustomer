import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../core/class/base-component';
import { ImagePath } from '../../../core/config/imagepth.config';
import { MealSizeEnum } from '../../../core/enum/MealSizeEnum';
import { MenuSectionFullInfo } from '../../../core/interface/MenuSectionFullInfo';
import { MenuSections } from '../../../core/interface/MenuSections';
import { EstablishmentsService } from '../../../core/services/establishments.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent extends BaseComponent implements OnInit {
  //other variable
  mealSize = MealSizeEnum

  // Data variable
  public menuSection!: MenuSections;
  public selectedMenus: string[] = [];
  public menuSectionInfo: MenuSectionFullInfo[] = [];

  constructor(
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    private _estblishmentsService: EstablishmentsService,
    private _imagePath: ImagePath
  ) {
    super(_matSnackBar);
    this.getEstblishmentsMenuSections();
  }

  ngOnInit(): void { }

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
        this.showError(err?.errorMessage);
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
    }
    else {
      this.selectedMenus.push(menuSectionId);
    }

    if (this.menuSectionInfo && this.menuSectionInfo.filter(x => x.id == menuSectionId).length > 0) {
      this.menuSectionInfo = this.menuSectionInfo.filter(x => x.id != menuSectionId);
    }
    else {
      this._estblishmentsService.getEstablishmentMenuSectionItems(menuSectionId ?? '').subscribe({
        next: (res: MenuSectionFullInfo) => {
          this.menuSectionInfo.push(res);
          console.log(this.menuSectionInfo);
        },
        error: (err) => {
          this.isLoading = false;
          this.showError(err?.errorMessage);
        },
        complete: () => {
          this.isLoading = false;
        }
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
}
