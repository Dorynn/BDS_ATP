import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  rangeMoney: number[] = [0, 100];
  formatterDollar = (value: number): string => `$ ${value}`;
  parserDollar = (value: string): string => value.replace('$ ', '');
  projectList: any = [];
  currentPage: number = 0;
  total: number = 0;
  pageSize: number = 4;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjectList();
    
  }

  getProjectList():void {
    this.apiService.getProjectList({pageIndex: 0, pageSize: 4}).subscribe({
      next: (res: any) => {
        console.log(res);
        this.projectList = res.data;
        this.total = res.totalRecords;
        this.currentPage = res.currentPage;
        this.pageSize = res.currentSize;
      }
    })
  }

  goToProjectDetail(id: string):void {
    this.router.navigateByUrl(`/project-detail/${id}`)
  }

  handleChangePage(e: any) {
    console.log(e);
    this.apiService.getProjectList({pageIndex: e-1, pageSize: this.pageSize}).subscribe({
      next: (res: any) => {
        this.projectList = res.data
      }
    })
  }

}
