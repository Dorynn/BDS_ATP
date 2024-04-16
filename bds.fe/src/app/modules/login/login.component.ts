import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { isEmpty } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  isVisible = false;
  isConfirmLoading = false;
  password: string = '';
  phonenumber: string = '';
  isShowPassword: boolean = false;
  passwordType: string = 'password';
  isEmpty: boolean = false;
  isInvalid: boolean = false;

  constructor(
    private dataService: DataService
  ) {
    this.dataService.isVisibleLoginModal.subscribe(status => this.isVisible = status)
  }

  ngOnInit(): void {

  }

  showPassword():void {
    this.isShowPassword = !this.isShowPassword;
    this.passwordType = this.isShowPassword ? 'text' : 'password'
  }

  handleLogin():void {
    if(this.phonenumber == '' || this.password == ''){
      this.isEmpty = true;
    }else{
      // if success isInvalid = false
      // else isInvalid = true;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOnchange(): void {
    this.isInvalid = false;
    this.isEmpty = false;    
  }
}
