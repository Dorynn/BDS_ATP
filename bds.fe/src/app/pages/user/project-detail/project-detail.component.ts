import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from '../../../services/data.service';
import { CountdownEvent } from 'ngx-countdown/interfaces';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  projectId: string | null = this.route.snapshot.paramMap.get('id');
  projectDetail: any = {}
  areaList: any = [];
  item: any = [];
  stompClient!:any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private dataService: DataService,
    private socketService: SocketService
  ) {
    this.stompClient = this.socketService.connect();
    this.stompClient.connect({}, (frame:any) => {
      this.stompClient.subscribe('/topic/lock_land', (message: any) => {
        this.getProjectDetail();
      })
    })

  }

  ngOnInit(): void {
    this.getProjectDetail();
  }

  getProjectDetail(): void {
    this.apiService.getProjectById(this.projectId).subscribe({
      next: (res: any) => {
        this.projectDetail = res.data;
        this.areaList = res.data.areas;
      }
    })
  }

  showConfirm(item: any, area: any): void {
    this.item = {
      ...item,
      projectName: this.projectDetail.name,
      areaName: area.name,
      areaId: area.id,
      projectId: this.projectId,
      investor: this.projectDetail.investor,
      price: item.price,
      deposit: item.deposit,
      description: item.description,
      acreage: item.acreage,
      hostBank: this.projectDetail.hostBank,
      bankName: this.projectDetail.bankName,
      bankNumber: this.projectDetail.bankNumber,
      qr: `https://qr.sepay.vn/img?acc=${this.projectDetail.bankNumber}&bank=${this.projectDetail.bankName}&amount=${item.deposit * 100}&des=013+${item.name}`
    };
    this.modalService.confirm({
      nzTitle: 'Xác nhận đặt cọc',
      nzContent: 'Bạn có chắc muốn đặt cọc bất động sản này, sau khi ấn đồng ý, bất động sản sẽ được tạm khóa để bạn tiến hành quá trình thanh toán. Vui lòng cân nhắc kỹ !',
      nzOkText: 'Đồng ý',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.openPaymentModal();
        this.updateLandStatus("2", item.id)
      },
      nzOnCancel: () => {
      }

    })
  }

  updateLandStatus(status: string, id: string){
    let formData = new FormData();
    formData.append("id", id);
    formData.append("status", status);
    this.apiService.updateLandStatus(formData).subscribe({
      next: (res: any) => {
        this.stompClient.send("/app/lands_lock", {}, JSON.stringify(this.item))
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
      qr: `https://qr.sepay.vn/img?acc=${this.projectDetail.bankNumber}&bank=${this.projectDetail.bankName}&amount=${item.deposit * 100}&des=013+${item.name}`
    };
    this.dataService.changeStatusLandDetailModal(true);
  }
}
