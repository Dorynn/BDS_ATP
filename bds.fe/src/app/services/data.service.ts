import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private statusLoginModal = new BehaviorSubject(false);
  private statusRegisterModal = new BehaviorSubject(false);
  isVisibleLoginModal = this.statusLoginModal.asObservable();
  isVisibleRegisterModal = this.statusRegisterModal.asObservable();

  

  constructor() { }

  changeStatusLoginModal (status: boolean) {
    this.statusLoginModal.next(status);
  }

  changeStatusRegisterModal (status: boolean) {
    this.statusRegisterModal.next(status);
  }
}
