import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent implements OnInit {
  isVisible: boolean = false;
  constructor(
    private dataService: DataService
  ){}

  ngOnInit(): void {
    this.dataService.isVisiblePaymentModal.subscribe(status => this.isVisible = status)
  }

  onCancel(): void {
    this.isVisible = false;
  }

  handleTransaction (): void {
    
  }
}
