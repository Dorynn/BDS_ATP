import { Component, Input, OnInit } from '@angular/core';
import { CountdownEvent } from 'ngx-countdown';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent implements OnInit {
  @Input() item:any = [];
  isVisible: boolean = false;
  config: any = {
    leftTime: 10,
    format: 'mm:ss'
  }

  constructor(
    private dataService: DataService
  ){}

  ngOnInit(): void {
    this.dataService.isVisiblePaymentModal.subscribe(status => this.isVisible = status)
  }

  onCancel(): void {
    this.isVisible = false;
    this.dataService.changeStatusPaymentModal(false);
  }

  handleEvent(e: CountdownEvent) {
    console.log(e);
    if(e.left == 0) {
      alert('Time out');
      
    }
  }

  handleTransaction (): void {
    
  }
}
