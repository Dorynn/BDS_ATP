import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-verify-phone-number',
  templateUrl: './verify-phone-number.component.html',
  styleUrl: './verify-phone-number.component.css'
})
export class VerifyPhoneNumberComponent implements OnInit {
  phoneNumber: string = '';
  otp: string = '';
  isVisible: boolean = false;

  constructor(
    private dataService: DataService
  ){}

  ngOnInit(): void {
    this.dataService.isVisibleVerifyPhoneNumber.subscribe(status => this.isVisible = status)
  }

  onCancel(): void {
    this.isVisible = false;
  }
}
