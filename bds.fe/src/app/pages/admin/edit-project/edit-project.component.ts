import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { threadId } from 'worker_threads';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent implements OnInit {
  name!: string;
  type!: string;
  status!: string;
  thumbnail!: File;
  description!: string;
  district!: string;
  address!: string;
  investor!: string;
  bankHost!: string;
  bankNumber!: string;
  bankName!: string;
  qrImage!: File;
  investorPhoneNumber!: string;
  startDate!: Date;
  endDate!: Date;
  stompClient: any;
  provinceId: any;
  provinceList: any = [];
  districtList: any = [];
  projectId: string | null = this.route.snapshot.paramMap.get('id');
  projectDetail: any = [];
  isChangeThumbnail: boolean = false;
  isChangeQrImg: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private msg: NzMessageService
  ){}

  ngOnInit(): void {
    this.getProjectById();
    this.getProvinceList();
  }
  
  getProjectById() {
    console.log(this.projectId);
    
    return this.apiService.getProjectById(this.projectId).subscribe({
      next: (res: any) => {
        this.projectDetail = res.data;
        this.name = res.data.name;
        this.type = res.data.projectType.id;
        this.address = res.data.address;
        this.bankHost = res.data.hostBank;
        this.bankName = res.data.bankName;
        this.bankNumber = res.data.bankNumber;
        this.investor = res.data.investor;
        this.investorPhoneNumber = res.data.investorPhone;
        this.district = res.data.district.id;
        this.description = res.data.description;
        this.provinceId = res.data.district.provinceId
        this.status = res.data.status;
        this.endDate = new Date(res.data.endDate);
        this.startDate = new Date(res.data.startDate);
        this.thumbnail = res.data.thumbnail;
        this.qrImage = res.data.qrImg;
        this.getDistrictByProvince();
      }
    })
  }  

  editProject(){
    const formData = new FormData();
    let id: string = String(this.projectId);
    formData.append("id", id)
    formData.append("name", this.name)
    formData.append("description", this.description)
    formData.append("status", this.status)
    formData.append("address", this.address)
    formData.append("startDate", this.startDate.toISOString().substring(0,10))
    formData.append("endDate", this.endDate.toISOString().substring(0,10))
    formData.append("bankNumber", this.bankNumber)
    formData.append("bankName", this.bankName)
    formData.append("hostBank", this.bankHost)
    formData.append("investor", this.investor)
    formData.append("investorPhone", this.investorPhoneNumber)
    formData.append("projectTypeId", this.type)
    formData.append("districtId", this.district)
    if (this.isChangeThumbnail) {
      formData.append("thumbnail", this.thumbnail)
    }
    if (this.isChangeQrImg){
      formData.append("qrImg", this.qrImage)
    }

    this.apiService.updateProject(formData).subscribe({
      next: (res: any) => {
        this.msg.success("Cập nhật dự án thành công!")
      },
      error: (err:any) => {
        this.msg.error("Cập nhật giao dịch thất bại")
      }
    })
  }

  onFileSelected(event: any) {
    this.thumbnail = event.target.files?.[0]
    this.isChangeThumbnail = true;
  }

  onFile2Selected(event: any) {
    this.qrImage = event.target.files?.[0]
    this.isChangeQrImg = true;
    
  }

  getProvinceList(): void {
    this.apiService.getAllProvince().subscribe({
      next: (res: any) => {
        this.provinceList = res.data;
      }
    })
  }

  getDistrictByProvince(): void {
    this.apiService.getDistrictByProvinceId(this.provinceId).subscribe({
      next: (res: any) => {
        this.districtList = res.data
      }
    })
  }

  onChangeProvince() {
    this.getDistrictByProvince();
  }
}
