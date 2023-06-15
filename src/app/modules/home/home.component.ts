import { Component, OnInit } from '@angular/core';
import { Establishment } from 'src/app/core/interface/Establishment';
import { EstablishmentTable } from 'src/app/core/interface/Table';
import { EstablishmentsService } from 'src/app/core/services/establishments.service';
import { AddVisitorRequest } from './home';
import { Router } from '@angular/router';
import { AddVisitorResponse } from 'src/app/core/interface/AddVisitorResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Data Variables
  public generalInfo!:Establishment;
  public tableInfo!:EstablishmentTable;
  public visitorsId!:AddVisitorResponse

  // Input Feild Variables
  public customerName:string = 'Customer'

  constructor(
    private _estblishmentsService:EstablishmentsService,
    private _router:Router){}


  ngOnInit(): void {
    this.getEstblishmentsGeneralInfo();
    
    this.getEstablishmentsTableInfo();
  }

  /**
   * Get Estblishments General Info
   */
  getEstblishmentsGeneralInfo(){
    this._estblishmentsService.getEstblishmentsGeneralInfo().subscribe({
      next:(res:Establishment)=>{
        this.generalInfo = res
        console.log(this.generalInfo, 'generalInfo')
      },
      error:(err)=>{
        console.log(err?.message)

      },
      complete:()=>{

      }
    })
  }
  
  /**
   * Get Establishments Table Info 
   */
  getEstablishmentsTableInfo(){
    let staticTableId = '4f18b916-bb5f-11ed-afa1-0242ac120002' // Todo you will get table id after Qr scan completed
    this._estblishmentsService.getEstablishmentsTableInfo(staticTableId).subscribe({
      next:(res:EstablishmentTable)=>{
        this.tableInfo = res;
        console.log(this.tableInfo, 'tableInfo')
      },
      error:(err)=>{
        console.log(err?.message)

      },
      complete:()=>{

      }
    })
    
  }

  /**
   * To Add Visitor and to the get Visitor Id
   */
  addVisitorToTable(){
    let staticTableId = '4f18b916-bb5f-11ed-afa1-0242ac120002' // Todo you will get table id after Qr scan completed
    this._estblishmentsService.addVisitorToTable(staticTableId, this.initializationVisitorToTable()).subscribe({
      next:(res:AddVisitorResponse)=>{
        this.visitorsId = res
        console.log(this.visitorsId, 'visitorsId')
        this.navigateTo(`/menu`)
      },error:(err)=>{
        console.log(err?.message)

      },
      complete:()=>{

      }
    })
  }

  initializationVisitorToTable(){
    let reqBody = new AddVisitorRequest()
    reqBody.name = this.customerName

    return reqBody
  }


  /**
   * To navigate other pages
   * @param path 
   */
    navigateTo(path:string){
      this._router.navigate([path]).then((res)=>{
        console.log(`Successfully Navigate to ${res}`)
      }).catch((err)=>{
        console.log(err?.message)
      })
    }
}
