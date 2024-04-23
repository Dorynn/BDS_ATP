import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-land-management',
  templateUrl: './land-management.component.html',
  styleUrl: './land-management.component.css'
})
export class LandManagementComponent implements OnInit {
  landList: any = [];
  projectList: any = [];
  areaList: any = [];
  name: string = '';
  requestParams: any = {
    name: '',
    projectId: '',
    areaId: ''
  }

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getLandList({});
    this.getProjectList();
  }

  getProjectList(){
    this.apiService.getAllProject().subscribe({
      next: (res: any) => {
        this.projectList = res.data
      }
    })
  }

  getAreaByProjectId(){
    this.apiService.getProjectById(this.requestParams.projectId).subscribe({
      next: (res: any) => {
        this.areaList = res.data
      }
    })
  }

  getLandList(request: any){
    this.apiService.getLandList(request).subscribe({
      next: (res: any) => {
        this.landList = res.data
      }
    })

  }

  goToAddLand(){
    this.router.navigateByUrl('/admin/add-land')
  }

  goToEditLand(id: string){
    this.router.navigateByUrl(`/admin/edit-land/${id}`)
  }
}
