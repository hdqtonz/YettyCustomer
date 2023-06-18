import { MatSnackBar } from '@angular/material/snack-bar';

export class BaseComponent {
  public isLoading!: boolean;

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Show message in SnackBar
   * @param {string} message Message to show in SnackBar
   * @param {string} action Action on SnackBar
   */
  showMessage(message: string, action?: string) {
    this.snackBar.open(message, action ? action : 'X', {
      duration: 500000,
      panelClass: 'green-snackbar',
    });
  }

  /**
   * Show error message in SnackBar
   * @param {string} message Error message to be shown
   * @param {string} action Action on SnackBar
   */
  showError(message: string, action?: string) {
    console.log('this Error from', this.constructor.name, message);
    this.snackBar.open(
      message ? message : 'Something went wrong. Please try again later.',
      action ? action : 'X',
      {
        duration: 5000,
        panelClass: 'red-snackbar',
      }
    );
  }
}
