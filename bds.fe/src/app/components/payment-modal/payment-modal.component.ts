import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CountdownEvent } from 'ngx-countdown';
import { ApiService } from '../../services/api.service';
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
    private apiService: ApiService,
    private msg: NzMessageService
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
      this.onCancel()
      this.handleReload.emit({isCancel: true, itemId: this.item.id})
      localStorage.setItem('isPaymentOpen', JSON.stringify(false));
      localStorage.removeItem("item")
    }
  }

  handleTransaction(): void {
    let user = sessionStorage.getItem("user")
    console.log(user);
    
    if(user){
      let parseUser = JSON.parse(user)
      let request = {
        userId: parseUser.id,
        landId: this.item.id
      }
      console.log(request)
      this.apiService.createTransaction(request).subscribe({
        next: (res: any) => {
          this.msg.success(`Bạn đã thực hiện đặt cọc thành công!`)
          this.onCancel();
        }
      })
    }
  }

  showConfirmCancel(): void {
    this.modalService.confirm({
      nzTitle: 'Xác nhận hủy đặt cọc',
      nzContent: 'Bạn có chắc muốn hủy đặt cọc bất động sản này, sau khi ấn đồng ý, bất động sản sẽ được cập nhật lại trạng thái mở bán',
      nzOkText: 'Đồng ý',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.msg.success("Hủy đặt cọc thành công!")
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
