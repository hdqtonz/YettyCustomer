import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../../../core/class/base-component';
import { Check } from '../../../core/interface/Check';
import { CheckService } from '../../../core/services/check.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})

export class CheckComponent extends BaseComponent implements OnInit {

  public selectedTable: string = ''
  public check: Check;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _checkService: CheckService,
  ) {
    super(_matSnackBar);
  }

  ngOnInit(): void {
    this.getCheckOrderList(true);
  }

  onRadioButtonChange(event) {
    this.getCheckOrderList(event.value);
  }

  getCheckOrderList(value) {
    this.isLoading = true;
    this._checkService.getTableCheck(value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.check = res;
        console.log(res);
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err?.message);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  checkUncheckAllCheckbox() {

  }

  onCheckboxChange() {

  }
}
