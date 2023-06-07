import { Component, OnInit } from '@angular/core';
import { LocalizationService } from './core/services/localization.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private _localizationService:LocalizationService){}
  title = 'yetty-customer';

  ngOnInit(): void {
    console.log("Enviroment is ",environment.name)
    this.setLanguage()
  }

  setLanguage(){
    this._localizationService.setFromStorage()
  }


}
