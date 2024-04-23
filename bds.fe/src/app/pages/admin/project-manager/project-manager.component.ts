import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrl: './project-manager.component.css'
})
export class ProjectManagerComponent implements OnInit {
  projectList: any = [];
  total: number= 0;
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit():void {
    this.getProjectList();
  }

  getProjectList() {
    this.apiService.getProjectList({pageIndex:0, pageSize: 10}).subscribe({
      next: (res: any) => {
        this.total = res.totalRecords;
        this.currentPage = res.currentPage
        this.projectList = res.data;
      }
    })
  }

  handleChangePage(e: any) {
    console.log(e);
    this.apiService.getProjectList({pageIndex: e-1, pageSize: this.pageSize}).subscribe({
      next: (res: any) => {
        this.projectList = res.data
      }
    })
  }

  goToAddProject() {
    this.router.navigateByUrl('/admin/add-project')
  }

  goToEditProject(id: string) {
    this.router.navigateByUrl(`/admin/edit-project/${id}`)
  }
}
