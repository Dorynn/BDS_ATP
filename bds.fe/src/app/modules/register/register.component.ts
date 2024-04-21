import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isVisible: boolean = false;

  constructor(
    private dataService: DataService
  ){
    this.dataService.isVisibleRegisterModal.subscribe(status=>this.isVisible = status)
  }

  handleCancel(){
    this.isVisible = false;
  }

  showLoginModal(){
    this.dataService.changeStatusRegisterModal(false);
    this.dataService.changeStatusLoginModal(true);
  }

  loginWithGoogle() {
    this.dataService.changeStatusVerifyPhoneNumberModal(true)
  }
}
