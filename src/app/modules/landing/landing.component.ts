import { Component, OnInit } from '@angular/core';
import { EstablishmentsSettingDTO } from 'src/app/core/interface/establishment-setting';
import { EstablishmentsService } from 'src/app/core/services/establishments.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit{
  public EstablishmentsSetting!:EstablishmentsSettingDTO

  constructor(private _establishmentsService:EstablishmentsService){}
  

  ngOnInit(): void {
    this._establishmentsService.getEstablishmentsData().subscribe({
      next:(data:any)=>{
        this.EstablishmentsSetting = data
        console.log(this.EstablishmentsSetting, 'EstablishmentsSetting')
      },
      error:(e)=>{

      },
      complete:()=>{

      }
    })  
  }


}
