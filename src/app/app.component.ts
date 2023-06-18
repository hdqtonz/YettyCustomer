import { Component, OnInit } from '@angular/core';
import { LocalizationService } from './core/services/localization.service';
import { environment } from 'src/environments/environment';
import { LocalStorage } from './core/class/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _localizationService: LocalizationService) {}
  title = 'yetty-customer';

  ngOnInit(): void {
    console.log('Enviroment is ', environment.name);

    this.setLanguage();
    this.collectUserLocalInformation();
  }

  setLanguage() {
    this._localizationService.setFromStorage();
  }

  collectUserLocalInformation() {
    this.getLocation();
  }

  getLocation(): void {
    navigator.permissions &&
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (PermissionStatus) {
          if (PermissionStatus.state == 'granted') {
            //allowed
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                const longitude = position.coords.longitude;
                const latitude = position.coords.latitude;
                let location = {
                  lat: latitude,
                  log: longitude,
                  long: longitude,
                };
                localStorage.setItem(
                  LocalStorage.LatLong,
                  JSON.stringify(location)
                );
              });
            }
          } else if (PermissionStatus.state == 'prompt') {
            // prompt - not yet grated or denied
            localStorage.removeItem(LocalStorage.LatLong);
          } else {
            //denied
            localStorage.removeItem(LocalStorage.LatLong);
          }
        });
  }
}
