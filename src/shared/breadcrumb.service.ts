import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<string[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor(){
    // TODO
  }

  updateBreadcrumbs(breadcrumbs: string[]): void {
    this.breadcrumbsSubject.next(breadcrumbs);    
  }
}
