import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Observable, first, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  constructor(
    @Inject(DOCUMENT)
    private document: Document
  ) {}

  public initiate(clientId: string, currency: string): Observable<void> {
    const paypalScriptElement: HTMLScriptElement =
      this.document.createElement('script');

    paypalScriptElement.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
    paypalScriptElement.id = 'paypal-script';

    this.document.head.appendChild(paypalScriptElement);

    return fromEvent<void>(paypalScriptElement, 'load').pipe(first());
  }

  public remove(): void {
    const paypalScriptElement = this.document.getElementById('paypal-script');

    this.document.head.removeChild(paypalScriptElement);
  }
}
