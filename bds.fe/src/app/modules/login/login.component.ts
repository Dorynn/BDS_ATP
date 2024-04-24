declare var google: any;
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, input, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, AfterViewInit {
  @Output() statusChange = new EventEmitter<boolean>();
  @Output() checkLogin = new EventEmitter<any>();
  isVisible!: boolean;
  isConfirmLoading = false;
  isEmpty: boolean = false;
  isInvalid: boolean = false;

  constructor(
    private dataService: DataService,
  ) {
    this.dataService.isVisibleLoginModal.subscribe(status => this.isVisible = status)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('loginlll');
    google.accounts.id.initialize({
      client_id: '612650383457-uvm6i6c4juhrma96b3eih4ld7up2mnan.apps.googleusercontent.com',
      callback: (res: any) => this.handleLogin(res)
    });

    let check = document.getElementById("google-btn")
    console.log(check);

    google.accounts.id.renderButton(document.getElementById("googleSignInButtonContainer"), {
      theme: 'outline',
      size: 'medium',
      shape: 'rectangle',
      width: 800,
      text: 'Đăng nhập với google'
    })

  }

  private decodeToken(token: string){
    console.log(token);
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any) {
    if (response) {
      console.log('success');
      const payload = this.decodeToken(response.credential);
      let user = JSON.stringify(payload)
      sessionStorage.setItem("loginInf", user)
      this.checkLogin.emit(payload);
      // this.handleCancel();
      this.isVisible = false;
    }

  }

  handleCancel(): void {
    console.log('cancel');
    this.isVisible = false;
    this.statusChange.emit(false)
  }

  handleOnchange(): void {
    this.isInvalid = false;
    this.isEmpty = false;
  }

  showRegisterModal() {
    this.dataService.changeStatusLoginModal(false);
    this.dataService.changeStatusRegisterModal(true);
  }
}
