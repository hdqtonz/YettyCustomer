import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/core/services/localization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  public languages:any = [
    {
      Name:"English",
      Value:"en"
    },
    {
      Name:"Franch",
      Value:"fr"
    },
  ]

  constructor(private _localizationService:LocalizationService){}

  ngOnInit(): void {
  }

  onLanguageChange(event:any){
    let lang = event.target.value
    this._localizationService.setLang(lang)
  }
}
