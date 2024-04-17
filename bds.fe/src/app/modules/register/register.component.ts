import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isVisible: boolean = false;
  isVisible2: boolean = false;
  password: string = '';
  rePassword: string = '';
  passwordType: string = 'password';
  rePasswordType: string = 'password';
  isShowPassword: boolean = false;
  isShowRePassword: boolean = false;

  constructor(
    private dataService: DataService
  ){
    this.dataService.isVisibleRegisterModal.subscribe(status=>this.isVisible = status)
    this.dataService.isVisibleRegisterModalStep2.subscribe(status => this.isVisible2 = status)
  }

  handleCancel(){
    this.isVisible = false;
  }

  handleOnchange(){

  }

  showPassword(){
    this.isShowPassword = !this.isShowPassword
  }
  
  showRePassword(){
    this.isShowRePassword = !this.isShowRePassword
  }

  showLoginModal(){
    this.dataService.changeStatusRegisterModal(false);
    this.dataService.changeStatusLoginModal(true);
  }

  goToNextStep(){
    // this.dataService.changeStatusRegisterModalStep2(true);
    this.isVisible2 = true;
    this.isVisible = false;
  }
}
