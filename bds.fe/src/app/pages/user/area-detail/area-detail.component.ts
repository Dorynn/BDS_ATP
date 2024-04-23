import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-area-detail',
  templateUrl: './area-detail.component.html',
  styleUrl: './area-detail.component.css'
})
export class AreaDetailComponent implements OnInit, OnChanges {
  projectId: string | null = this.route.snapshot.paramMap.get('id');
  areaId: string | null = this.route.snapshot.paramMap.get('area-id')
  projectDetail: any = [];
  areaList: any = [];
  areaDetail: any = [];
  item: any = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: NzModalService,
    private router: Router
  ) {
  }

  ngOnChanges(): void {
    // this.dataService.changeStatusPaymentModal(false);
    // this.dataService.changeStatusLandDetailModal(false);    
  }
  
  ngOnInit(): void {
    console.log('on init');
    
    this.getAreaDetail()
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

  getAreaDetail(): void {
    this.apiService.getAreaById(this.areaId).subscribe({
      next: (res: any) => {
        this.areaDetail = res.data;
        console.log(res);

      }
    })
  }

  openLandDetailModal(item: any) {
    this.item = {
      ...item,
      projectName: this.projectDetail.name,
      areaName: this.areaDetail.name,
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

  showConfirm(item: any): void {
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

  openPaymentModal(): void {
    this.dataService.changeStatusPaymentModal(true);
  }

  handleChangeArea(item: any){
    this.areaId = item.id;
    this.getAreaDetail();
  }
}
