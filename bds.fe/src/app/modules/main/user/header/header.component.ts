declare var google: any;
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppService } from '../../../../services/app.service';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isOpenLogin: boolean = false;
  isLogin: boolean = false;
  user: any;
  constructor(
    private dataService: DataService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    let user = sessionStorage.getItem('loginInf')
    if(user){
      this.isLogin = true;
      this.user = JSON.parse(user)
    }
  }

  closeLogin() {
    this.isOpenLogin = false;
  }

  showModal(): void {
    this.dataService.changeStatusLoginModal(true);
    this.isOpenLogin = true;
  }

  showRegisterModal(): void {
    this.dataService.changeStatusRegisterModal(true);
  }

  handleLogout():void {
    console.log('logout');
    
    this.appService.signOut();
    this.isLogin = false;
  }

  checkLogin(e: any) {
    this.isLogin = true;
    this.user = e
  }
}
