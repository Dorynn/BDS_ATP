import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnInit {
  transactionList: any = [];
  user!:any;
  tabs = [{status: 0, label:'Chờ xác nhận'}, {status:1, label:'Thanh toán thành công'}, {status:2, label:'Thanh toán thất bại'}];
  constructor(
    private apiService: ApiService
  ){}

  ngOnInit(): void {
    console.log('transaction');
    let stringUser = sessionStorage.getItem("user");
    if(stringUser){
      this.getTransactionOfUser(0);
      console.log(stringUser);
      
      let user = JSON.parse(stringUser);
      this.user = user;
      console.log(user);
      
    }
    
  }

  getTransactionOfUser(status: number){
    console.log(this.user);
    
    let params = {
      id: this.user?.id,
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
