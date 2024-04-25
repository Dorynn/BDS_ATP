import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  userList: any = [];
  total: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private apiService: ApiService
  ){}
  
  ngOnInit(): void {
    this.getUserList({})
  }
  getUserList(params: any){
    this.apiService.getUserList(params).subscribe({
      next: (res: any) => {
        this.userList = res.data
      }
    })
  }
  handleChangePage(event: any){
    let params = {
      pageIndex:this.currentPage,
      pageSize:this.pageSize
    }
    this.getUserList(params)
  }
}
