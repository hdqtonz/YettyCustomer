import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../core/class/base-component';
import { MenuSectionFullInfo } from '../../../core/interface/MenuSectionFullInfo';
import { MenuSections } from '../../../core/interface/MenuSections';
import { EstablishmentsService } from '../../../core/services/establishments.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent extends BaseComponent implements OnInit {

  // Data variable
  public menuSection!: MenuSections;
  public menuSectionInfo!: MenuSectionFullInfo;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    private _estblishmentsService: EstablishmentsService,
  ) {
    super(_matSnackBar);
    this.getEstblishmentsMenuSections();
  }

  ngOnInit(): void {
    this.getEstblishmentsMenuSections();
  }

  menuType: string = 'grid' || 'tile';

  /**
  * Get Estblishments Menu Section
  */
  getEstblishmentsMenuSections() {
    this.isLoading = true;
    this._estblishmentsService.getEstablishmentMenuSections().subscribe({
      next: (res: MenuSections) => {
        this.menuSection = res;
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

  checkValue(menuSectionId: string | undefined) {
    console.log(menuSectionId);
    this._estblishmentsService.getEstablishmentMenuSectionItems(menuSectionId ?? '').subscribe({
      next: (res: MenuSectionFullInfo) => {
        this.menuSectionInfo = res;
        console.log(this.menuSectionInfo);
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err?.errorMessage);
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  menuItems = [
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
  ];
}
