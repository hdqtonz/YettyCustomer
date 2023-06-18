import { Component, OnInit } from '@angular/core';
import { Establishment } from 'src/app/core/interface/Establishment';
import { EstablishmentTable } from 'src/app/core/interface/Table';
import { EstablishmentsService } from 'src/app/core/services/establishments.service';
import { AddVisitorRequest } from './home';
import { Router } from '@angular/router';
import { AddVisitorResponse } from 'src/app/core/interface/AddVisitorResponse';
import { AccountService } from 'src/app/core/services/account.service';
import { AppRoute } from 'src/app/core/class/app-route';
import { WorkingDaysEnum } from 'src/app/core/enum/workingDaysEnums';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { LocalStorage } from 'src/app/core/class/local-storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/core/class/base-component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  // other Variables
  workingDaysEnum = WorkingDaysEnum;

  // Data Variables
  public generalInfo!: Establishment | null;
  public tableInfo!: EstablishmentTable | null;
  public visitors!: AddVisitorResponse | null;
  public TableId!: string;

  // Input Feild Variables
  public customerName: string = 'Customer ';

  constructor(
    private _matSnackBar: MatSnackBar,
    private _accountService: AccountService,
    private _estblishmentsService: EstablishmentsService,
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) {
    super(_matSnackBar);

    if (!this._accountService.establishmentInfo) {
      this.navigateTo(AppRoute.Landing);
    }

    this.TableId =
      this._localStorageService.getItem(LocalStorage.TABLE_ID) ?? '';

    this.getEstblishmentsGeneralInfo();
  }

  ngOnInit(): void {
    this.getEstablishmentsTableInfo();
  }

  /**
   * Get Estblishments General Info
   */
  getEstblishmentsGeneralInfo() {
    this._accountService.currentEstablishmentInfo.subscribe({
      next: (res: Establishment) => {
        this.generalInfo = res;
      },
    });
  }

  /**
   * Get Establishments Table Info
   */
  getEstablishmentsTableInfo() {
    if (!this.TableId) {
      this.navigateTo(AppRoute.Landing);
      return;
    }
    this.isLoading = true;
    this._estblishmentsService
      .getEstablishmentsTableInfo(this.TableId)
      .subscribe({
        next: (res: EstablishmentTable) => {
          this.tableInfo = res;

          // setting up customer count
          this.customerName += this.tableInfo?.visitors.length + 1 ?? '';
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.showError(err?.errorMessage);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  /**
   * To Add Visitor and to the get Visitor Id
   */
  addVisitorToTable() {
    if (!this.TableId) {
      this.showError('Please Join the Table');
      return;
    }
    this.isLoading = true;
    this._estblishmentsService
      .addVisitorToTable(this.TableId, this.initializationVisitorToTable())
      .subscribe({
        next: (res: AddVisitorResponse) => {
          this.visitors = res;

          // Setting Up visitors id to local storage
          this._localStorageService.setItem(
            LocalStorage.VISITOR_ID,
            this.visitors.id
          );
          this.showMessage('Successfully Joined the Table');
          // Navigating usre to Manu page
          this.navigateTo(AppRoute.Menu);
          this.isLoading = false;
        },
        error: (err) => {
          this.showError(err?.errorMessage);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  /**
   * initailizing request body to join table
   * @returns
   */
  initializationVisitorToTable() {
    let reqBody = new AddVisitorRequest();
    reqBody.name = this.customerName;
    return reqBody;
  }

  /**
   * To navigate other pages
   * @param path
   */
  navigateTo(path: string) {
    this._router
      .navigate([path])
      .then((res) => {
        if (res) {
          this.scrollToTop();
        }
      })
      .catch((err) => {
        console.log(`Somting went wrong`);
      });
  }

  /**
   * To Scroll at Top
   */
  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
