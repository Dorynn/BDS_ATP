import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  projectId: string | null = this.route.snapshot.paramMap.get('id');
  projectDetail: any = {}
  areaList : any = [];
  item: any = []
  
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private dataService: DataService
    ){

  }

  ngOnInit(): void {
    this.getProjectDetail();
    // this.dataService.changeStatusPaymentModal(false);
    // this.dataService.changeStatusLandDetailModal(false);
  }

  getProjectDetail():void {
    this.apiService.getProjectById(this.projectId).subscribe({
      next: (res: any) => {
        this.projectDetail = res.data;
        this.areaList = res.data.areas;
      }
    })
  }

  showConfirm(item: any, areaName: string): void {
    this.item = {
      ...item,
      projectName: this.projectDetail.name,
      areaName: areaName,
      investor: this.projectDetail.investor,
      price: item.price,
      deposit: item.deposit,
      description: item.description,
      acreage: item.acreage,
      hostBank: this.projectDetail.hostBank,
      bankName: this.projectDetail.bankName,
      bankNumber: this.projectDetail.bankNumber,
      qr: `https://qr.sepay.vn/img?acc=${this.projectDetail.bankNumber}&bank=${this.projectDetail.bankName}&amount=${item.deposit*100}&des=013+${item.name}`
    };
    this.modalService.confirm({
      nzTitle: 'Xác nhận đặt cọc',
      nzContent: 'Bạn có chắc muốn đặt cọc bất động sản này, sau khi ấn đồng ý, bất động sản sẽ được tạm khóa để bạn tiến hành quá trình thanh toán. Vui lòng cân nhắc kỹ !',
      nzOkText: 'Đồng ý',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.openPaymentModal()
      },
      nzOnCancel: () => {
      }

    })
  }

  openPaymentModal() {
    this.dataService.changeStatusPaymentModal(true);
  }

  openLandDetailModal(item: any, areaName: string) {
    this.item = {
      ...item,
      projectName: this.projectDetail.name,
      areaName: areaName,
      investor: this.projectDetail.investor,
      price: item.price,
      deposit: item.deposit,
      description: item.description,
      acreage: item.acreage,
      hostBank: this.projectDetail.hostBank,
      bankName: this.projectDetail.bankName,
      bankNumber: this.projectDetail.bankNumber,
      qr: `https://qr.sepay.vn/img?acc=${this.projectDetail.bankNumber}&bank=${this.projectDetail.bankName}&amount=${item.deposit*100}&des=013+${item.name}`
    };
    this.dataService.changeStatusLandDetailModal(true);
  }
  
}
