import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoute } from 'src/app/core/class/app-route';
import { Establishment } from 'src/app/core/interface/Establishment';
import { AccountService } from 'src/app/core/services/account.service';
import { LocalizationService } from 'src/app/core/services/localization.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  AppRoute = AppRoute;

  public establishmentInfo!: Establishment;
  public isEstablishmentInfo: boolean = false;

  constructor(
    private _router: Router,
    private _localizationService: LocalizationService,
    private _accountService: AccountService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._accountService.currentEstablishmentInfo.subscribe(
      (details: Establishment) => {
        this.isEstablishmentInfo = true;
        this.establishmentInfo = details;
        this._cdr.detectChanges();
      }
    );
  }

  /**
   * To navigate other pages
   * @param path
   */
  navigateTo(path: string) {
    this._router
      .navigate([path])
      .then((res) => {
        this.scrollToTop();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
