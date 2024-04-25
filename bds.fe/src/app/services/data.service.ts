import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private statusLoginModal = new BehaviorSubject(false);
  private statusRegisterModal = new BehaviorSubject(false);
  private statusRegisterModalStep2 = new BehaviorSubject(false);
  private statusLandDetailModal = new BehaviorSubject(false);
  private statusPaymentModal = new BehaviorSubject(false);
  private statusVerifyPhoneNumber = new BehaviorSubject(false);
  private roleUser = new BehaviorSubject('USER');
  isVisibleLoginModal = this.statusLoginModal.asObservable();
  isVisibleRegisterModal = this.statusRegisterModal.asObservable();
  isVisibleRegisterModalStep2 = this.statusRegisterModalStep2.asObservable()
  isVisibleLandDetailModal = this.statusLandDetailModal.asObservable();
  isVisiblePaymentModal = this.statusPaymentModal.asObservable()
  isVisibleVerifyPhoneNumber = this.statusVerifyPhoneNumber.asObservable();
  isUser = this.roleUser.asObservable();

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

  changeStatusLandDetailModal (status: boolean) {
    this.statusLandDetailModal.next(status);
  }

  changeStatusPaymentModal (status: boolean) {
    this.statusPaymentModal.next(status);
  }

  changeStatusVerifyPhoneNumberModal (status: boolean) {
    this.statusVerifyPhoneNumber.next(status)
  }

  setRole(role: string){
    this.roleUser.next(role);
  }

}
