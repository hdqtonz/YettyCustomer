import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ImagePath {
  getImage(imageURL: string): string {
    // Set Extablishment Id in to the Image Url from Local Storage
    let establishmentId = localStorage.getItem('establishmentId');

    return `${environment.ImagePath.toString()}/${establishmentId}/${imageURL}`;
  }
}
