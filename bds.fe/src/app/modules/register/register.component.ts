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
}
