import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  Event as NavigationEvent,
  NavigationStart,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manu',
  templateUrl: './manu.component.html',
  styleUrls: ['./manu.component.scss'],
})
export class ManuComponent implements OnInit, OnDestroy {
  public showMenuOption: boolean = false;
  private routeSubscription: Subscription;

  constructor(private _router: Router, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.routeSubscription = this._router.events.subscribe((event: any) => {
      if (event.routerEvent instanceof NavigationEnd) {
        let current = event.routerEvent;
        if (current.url == '/menu/menu-items' || current.url == '/menu/check') {
          this.showMenuOption = true;
        } else {
          this.showMenuOption = false;
        }
      }
      this._cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
