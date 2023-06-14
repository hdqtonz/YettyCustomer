import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QrScannerComponent } from 'src/app/core/components/dialog-boxes/qr-scanner/qr-scanner.component';
import { EstablishmentsSettingDTO } from 'src/app/core/interface/establishment-setting';
import { EstablishmentsService } from 'src/app/core/services/establishments.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit{
  public EstablishmentsSetting!:EstablishmentsSettingDTO


  constructor(
    private _establishmentsService:EstablishmentsService,
    public _dialog: MatDialog){}
  

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


  
  onOfQrScanner(){  
    const dialogRef = this._dialog.open(QrScannerComponent, {
      height: '80%',
      width: '75%',
    });
  }


}
