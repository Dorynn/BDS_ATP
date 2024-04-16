import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private statusLoginModal = new BehaviorSubject(false);
  isVisibleLoginModal = this.statusLoginModal.asObservable();
  constructor() { }

  changeStatusLoginModal (status: boolean) {
    this.statusLoginModal.next(status)
  }
}
