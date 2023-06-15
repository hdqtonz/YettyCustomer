import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Establishment } from 'src/app/core/interface/Establishment';
import { AccountService } from 'src/app/core/services/account.service';
import { LocalizationService } from 'src/app/core/services/localization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public establishmentInfo!: Establishment | null;
  public isEstablishmentInfo: boolean = false;
  public languages: any = [
    {
      Name: 'English',
      Value: 'en',
    },
  ];

  constructor(
    private _router: Router,
    private _localizationService: LocalizationService,
    private _accountService: AccountService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._accountService.currentEstablishmentInfo.subscribe((details) => {
      this.isEstablishmentInfo = true;
      this.establishmentInfo = details;
      this._cdr.detectChanges();
    });
  }

  onLanguageChange(event: any) {
    let lang = event.target.value;
    this._localizationService.setLang(lang);
  }
}
