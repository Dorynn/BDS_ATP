import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-area-detail',
  templateUrl: './area-detail.component.html',
  styleUrl: './area-detail.component.css'
})
export class AreaDetailComponent {
  projectId: string | null = this.route.snapshot.paramMap.get('id');
  projectDetail: any = [];
  areaList: any = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: NzModalService
  ){}

  ngOnInit(): void {
    this.getProjectDetail();
  }

  getProjectDetail():void {
    this.apiService.getProjectById(this.projectId).subscribe({
      next: (res: any) => {
        this.projectDetail = res.data;
        this.areaList = res.data.areas;
      }
    })
  }

  openLandDetailModal() {
    this.dataService.changeStatusLandDetailModal(true);
  }

  showConfirm(): void {
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

  openPaymentModal():void{
    this.dataService.changeStatusPaymentModal(true);
  }
}
