import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnInit {
  transactionList: any = [];
  tabs = [{status: 0, label:'Chờ xác nhận'}, {status:1, label:'Thanh toán thành công'}, {status:2, label:'Thanh toán thất bại'}];
  constructor(
    private apiService: ApiService
  ){}

  ngOnInit(): void {
    this.getTransactionOfUser(0)
  }

  getTransactionOfUser(status: number){
    let params = {
      id: '67cc8239-014c-11ef-901f-507b9dcb621a',
      status: status
    }
    this.apiService.getTransactionOfUser(params).subscribe({
      next: (res:any) => {
        this.transactionList = res.data;
      } 
    })
  }

  changeTab(event: any) {
    this.getTransactionOfUser(event); 
  }
}
