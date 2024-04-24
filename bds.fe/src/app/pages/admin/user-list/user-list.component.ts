import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userList: any = [];
  total: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private apiService: ApiService
  ){}
  
  getUserList(){

  }
  handleChangePage(event: any){
    let params = {
      currentPage:this.currentPage,
      currentSize:this.pageSize
    }
  
  }
}
