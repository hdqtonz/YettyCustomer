import { PayPalSettings } from "./PayPalSettings";
import { RevolutSettings } from "./RevolutSettings";

export interface PaymentMethodsSettings {
    payPalSettings: PayPalSettings;
    revolutSettings: RevolutSettings;
}



