import { Injectable } from '@angular/core';
import { LocalizationService } from '../../services/localization.service';

@Injectable({ providedIn: 'root' })
export class AppLocalizationInitializationService {
  constructor(private localizationService: LocalizationService) {}

  initialize(): void {
    this.localizationService.setDefaults();
  }
}
