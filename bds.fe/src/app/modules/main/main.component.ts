declare var google:any;

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  ngOnInit(): void {    
    console.log('open');
    
    google.accounts.id.initialize({
      client_id: '',
      callback: (res: any) => {

      }
    });

    let check = document.getElementById("btn-test");
    console.log(check);
    
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350,
    })
  }
  
}
