import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit {
  name: string = '';
  type: string = '';
  status: number = 0;
  thumbnail: string = '';
  description: string = '';
  district: number = 0;
  address: string = '';
  investor: string = '';
  bankHost: string = '';
  bankNumber: string = '';
  bankName: string = '';
  qrImage: string = '';
  investorPhoneNumber: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  total: number = 0;
  stompClient: any;
  provinceList: any = [];
  districtList: any = [];
  
  constructor(
    private apiService: ApiService,
    private socketService: SocketService
  ){
    this.stompClient = this.socketService.connect();
    this.stompClient.connect({}, (frame:any) => {
      this.stompClient.subscribe('/topic/add_project', (message: any) => {
        console.log(message);
        
        this.getProjects();
      })
    })
  }
  
  ngOnInit(): void {
    this.getProjects();
    
  }

  addProject(){
    let request = {
      name: this.name,
      description: this.description,
      thumbnail: this.thumbnail,
      address: this.address,
      startDate: this.startDate,
      endDate: this.endDate,
      projectTypeId: this.type,
      investorId: "685c78d7-fd57-11ee-a6ee-507b9dcb621a",
      districtId: 13,
      status: 0
    }
    this.apiService.addProject(request).subscribe({
      next: (res:any)=>{
        console.log(res);
        this.stompClient.send("/app/projects", {},JSON.stringify(request));
      }
    })
  }

  getProjects(){
    this.apiService.getProjectList({pageIndex: 0, pageSize: 20}).subscribe({
      next: (res: any) => {
        console.log(res.totalRecords);
        this.total= res.totalRecords
      }
    })
  }



}
