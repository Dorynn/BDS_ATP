import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CountdownEvent } from 'ngx-countdown';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent implements OnInit {
  @Input() item!: any;
  @Output() handleReload = new EventEmitter<any>();
  isVisible: boolean = false;

  constructor(
    private dataService: DataService,
    private modalService: NzModalService,
  ) {
  }

  ngOnInit(): void {
    this.dataService.isVisiblePaymentModal.subscribe(status => this.isVisible = status)
    console.log('item', this.item);
    let item = localStorage.getItem("item")
    if (item) {
      this.item = JSON.parse(item)
    }
  }

  onCancel(): void {
    this.isVisible = false;
    this.dataService.changeStatusPaymentModal(false);
  }

  handleEvent(e: CountdownEvent) {
    console.log(e);
    if (e.left == 0) {
      // alert('Time out');
      this.onCancel()
      this.handleReload.emit({isCancel: true, itemId: this.item.id})
      localStorage.setItem('isPaymentOpen', JSON.stringify(false));
      localStorage.removeItem("item")
    }
  }

  handleTransaction(): void {

  }

  showConfirmCancel(): void {
    this.modalService.confirm({
      nzTitle: 'Xác nhận hủy đặt cọc',
      nzContent: 'Bạn có chắc muốn hủy đặt cọc bất động sản này, sau khi ấn đồng ý, bất động sản sẽ được cập nhật lại trạng thái mở bán',
      nzOkText: 'Đồng ý',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.onCancel()
        this.handleReload.emit({isCancel: true, itemId: this.item.id})
        localStorage.setItem('isPaymentOpen', JSON.stringify(false));
        localStorage.removeItem("item")
      },
      nzOnCancel: () => {

      }
    })
  }
}
