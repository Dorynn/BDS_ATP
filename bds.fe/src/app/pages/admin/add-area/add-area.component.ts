import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrl: './add-area.component.css'
})
export class AddAreaComponent implements OnInit{
  areaName: string = '';
  projectId: string = '';
  projectList: any = [];
  timeLimit: string = '';
  
  constructor(
    private apiService: ApiService,
  ){}

  ngOnInit(): void {
    this.getProjectList()
  }

  getProjectList(){
    this.apiService.getAllProject().subscribe({
      next: (res: any) => {
        this.projectList = res.data;
      }
    })
  }

  handleAddArea(){
    let request = {
      name: this.areaName,
      projectId:this.projectId,
      expiryDate: this.timeLimit
    }
    this.apiService.createArea(request).subscribe({
      next: (res: any) => {
        console.log(res);
        this.areaName = '';
        this.projectId = '';
        this.timeLimit = '';
      }
    })
  }
}
