import { Component, OnInit } from '@angular/core';
import { LocalizationService } from './core/services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private _localizationService:LocalizationService){}
  title = 'yetty-customer';

  ngOnInit(): void {
    this.setLanguage()
  }

  setLanguage(){
    this._localizationService.setFromStorage()
  }
}
