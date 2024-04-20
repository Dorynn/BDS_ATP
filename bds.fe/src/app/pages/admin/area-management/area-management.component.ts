import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-area-management',
  templateUrl: './area-management.component.html',
  styleUrl: './area-management.component.css'
})
export class AreaManagementComponent implements OnInit {
  projectList: any = [];
  total: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  constructor(
    private apiService: ApiService,
    private router: Router
  ){}
  
  ngOnInit():void {
    this.getProjectList();
  }

  getProjectList() {
    this.apiService.getProjectList({pageIndex:0, pageSize: 10}).subscribe({
      next: (res: any) => {
        this.total = res.totalRecords;
        this.currentPage = res.currentPage;
        this.pageSize = res.currentSize;
        this.projectList = res.data;
      }
    })
  }

  goToAddArea(){
    this.router.navigateByUrl('/admin/add-area');
  }

  handleChangePage(e: any){

  }
}
