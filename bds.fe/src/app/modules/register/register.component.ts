declare var google:any;

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, AfterViewInit {
  
  isVisible: boolean = false;

  constructor(
    private dataService: DataService
  ){
    this.dataService.isVisibleRegisterModal.subscribe(status=>this.isVisible = status)
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    console.log('register');
    
    google.accounts.id.initialize({
      client_id: '612650383457-uvm6i6c4juhrma96b3eih4ld7up2mnan.apps.googleusercontent.com',
      callback: (res: any) => this.handleSignUp(res)
    });

    google.accounts.id.renderButton(document.getElementById("googleSignUpButtonContainer"), {
      theme: 'outline',
      size: 'medium',
      shape: 'rectangle',
      width: 800,
      // context: 'signup'
    })
  }

  handleSignUp(res: any){
    if(res){
      console.log(res);
      
    }
  }

  handleCancel(){
    this.isVisible = false;
    this.dataService.changeStatusRegisterModal(false);
  }

  showLoginModal(){
    this.dataService.changeStatusRegisterModal(false);
    this.dataService.changeStatusLoginModal(true);
  }

  // loginWithGoogle() {
  //   this.dataService.changeStatusVerifyPhoneNumberModal(true)
  // }
}
