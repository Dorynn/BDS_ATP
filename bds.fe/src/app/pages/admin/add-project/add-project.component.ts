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
  description: string = '';
  thumbnail: string = '';
  status: number = 0;
  address: string = '';
  district: string = '';
  type: string = '';
  investor: string = '';
  total: number = 0;
  stompClient: any;

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
      name: "Vinhome Mega Grand World14",
      description: "Nhắc đến các khu đô thị của Vingroup tại Hà Nội, không thể không kể đến đại đô thị phía Tây Thủ đô – Vinhomes Smart City. Vinhomes Smart City nằm trên địa phận 2 phường Tây Mỗ & Đại Mỗ, quận Nam Từ Liêm, Hà Nội, ôm trọn vành đai 3, 5 của đại lộ Thăng Long cũng như 3 tuyến metro 5, 6, 7 trọng yếu. Do đó, vị trí Vinhomes Smart City được đánh giá là nơi hưởng trọn lợi thế hạ tầng giao thông hiện đại, đồng bộ.",
      thumbnail: "",
      address: "Phú Đô, quận Nam Từ Liêm, Hà Nội",
      startDate: "2022-05-25",
      endDate: "2023-04-29",
      projectTypeId: 1,
      investorId: "685c78d7-fd57-11ee-a6ee-507b9dcb621a",
      districtId: 13
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
