import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent {
  constructor(private _router: Router, private _menuService: MenuService) {}

  gOnInit(): void {
    this._menuService.getEstablishmentMenuSections().subscribe({
      next: (data: any) => {},
      error: (e) => {},
      complete: () => {},
    });
  }

  menuType: string = 'grid' || 'tile';
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
