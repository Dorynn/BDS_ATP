import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import Swiper from 'swiper';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  projectId: string | null = this.route.snapshot.paramMap.get('id');
  projectDetail: any = {}
  areaList : any = []

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getProjectDetail()
  }

  getProjectDetail():void {
    this.apiService.getProjectById(this.projectId).subscribe({
      next: (res: any) => {
        this.projectDetail = res.data;
        this.areaList = res.data.areas;
      }
    })
  }
  
}
