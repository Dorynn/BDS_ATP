import { Component } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private dataService: DataService
  ){}

  showModal():void {
    this.dataService.changeStatusLoginModal(true);
  }

  showRegisterModal():void {
    console.log('clickkk');
    
    this.dataService.changeStatusRegisterModal(true);
  }
}
