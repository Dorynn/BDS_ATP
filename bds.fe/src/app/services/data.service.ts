import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private statusLoginModal = new BehaviorSubject(false);
  private statusRegisterModal = new BehaviorSubject(false);
  private statusRegisterModalStep2 = new BehaviorSubject(false);
  isVisibleLoginModal = this.statusLoginModal.asObservable();
  isVisibleRegisterModal = this.statusRegisterModal.asObservable();
  isVisibleRegisterModalStep2 = this.statusRegisterModalStep2.asObservable()

  

  constructor() { }

  changeStatusLoginModal (status: boolean) {
    this.statusLoginModal.next(status);
  }

  changeStatusRegisterModal (status: boolean) {
    this.statusRegisterModal.next(status);
  }

  changeStatusRegisterModalStep2 (status: boolean) {
    this.statusRegisterModalStep2.next(status);
  }
}
