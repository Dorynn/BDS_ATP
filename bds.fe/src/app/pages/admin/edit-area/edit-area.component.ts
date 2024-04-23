import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-edit-area',
  templateUrl: './edit-area.component.html',
  styleUrl: './edit-area.component.css'
})
export class EditAreaComponent {
  name: string = '';
  projectName: string = '';
  projectId: string = '';
  projectList: any = [];
  timeLimit: string = '';
  areaId: string | null= this.route.snapshot.paramMap.get('id')

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getAreaById();
  }

  getAreaById(){
    this.apiService.getAreaById(this.areaId).subscribe({
      next: (res: any) => {
        this.name = res.data.name;
        this.projectName = res.data.projectName;
        this.timeLimit = res.data.expiryDate;
        this.projectId = res.data.projectId
      }
    })
  }

  

  handleEditArea(){
    let request = {
      id: this.areaId,
      name: this.name,
      projectId:this.projectId,
      expiryDate: this.timeLimit
    }
    this.apiService.updateArea(request).subscribe({
      next: (res: any) => {
        console.log(res);
        this.name = '';
        this.projectId = '';
        
      }
    })
  }
}
