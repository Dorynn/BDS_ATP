import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-land-info-modal',
  templateUrl: './land-info-modal.component.html',
  styleUrl: './land-info-modal.component.css'
})
export class LandInfoModalComponent implements OnInit{
  isVisible: boolean = false;
  @Input() item: any = [];

  constructor(
    private dataService: DataService,
    private modalService: NzModalService
  ){}

  ngOnInit(): void {
    this.dataService.isVisibleLandDetailModal.subscribe(status => this.isVisible = status);
  }
  handleCancel() {
    this.isVisible = false;
    this.dataService.changeStatusLandDetailModal(false);
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Xác nhận đặt cọc',
      nzContent: 'Bạn có chắc muốn đặt cọc bất động sản này, sau khi ấn đồng ý, bất động sản sẽ được tạm khóa để bạn tiến hành quá trình thanh toán. Vui lòng cân nhắc kỹ !',
      nzOkText: 'Đồng ý',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.dataService.changeStatusLandDetailModal(false);
        this.dataService.changeStatusPaymentModal(true);
      }
    })
  }
}
