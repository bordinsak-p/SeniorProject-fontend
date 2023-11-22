import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getProductImage(image: string): string {
    if (image) {
      return `${environment.baseUrl}images/${image}`
    }
    return 'assets/images/no_photo.jpg'
  }
}
