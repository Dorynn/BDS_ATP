import { Component, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message'
import { ApiService } from '../../../services/api.service';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-add-land',
  templateUrl: './add-land.component.html',
  styleUrl: './add-land.component.css'
})
export class AddLandComponent implements OnInit {
  name!: string;
  description!: string;
  thumbnail: NzUploadFile[] = [];
  address!: string;
  status!: string;
  price!: string;
  deposit!: string;
  acreage!: string;
  areaId!: string;
  previewVisible: boolean = false;
  previewImage: string | undefined = '';
  // fileList: NzUploadFile[] = [];
  // fileLandImage: NzUploadFile[] = [];
  loading: boolean = false;
  projectList: any = [];
  areaList: any = [];
  projectId: string = '';
  isProjectChange: boolean = false;

  constructor(
    private msg: NzMessageService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.handlePreview(info.file);
        this.loading = false;
        break;
      case 'error':
        // this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  getAllProjects() {
    this.apiService.getAllProject().subscribe({
      next: (res: any) => {
        this.projectList = res.data;
      }
    })
  }

  getAreaByProjectId() {
    this.apiService.getProjectById(this.projectId).subscribe({
      next: (res: any) => {
        this.areaList = res.data.areas
        console.log(this.areaList);

      }
    })
  }

  handleChangeProject() {
    this.isProjectChange = true;
    this.getAreaByProjectId();
  }

  handleAddLand() {
    let formData = new FormData();
    formData.append("name", this.name);
    formData.append("description", this.description);
    formData.append("thumbnail", this.thumbnail[0].originFileObj!);
    formData.append("address", this.address);
    formData.append("status", this.status);
    formData.append("price", this.price);
    formData.append("deposit", this.deposit);
    formData.append("acreage", this.acreage);
    formData.append("areaId", this.areaId)
    this.apiService.createLand(formData).subscribe({
      next: (res: any) => {
        this.msg.success('Tạo mới khu đất thành công!')
        this.name = '';
        this.description = '';
        this.thumbnail = [];
        this.acreage = '';
        this.address = '';
        this.status = '';
        this.price = '';
        this.deposit = '';
        this.areaId = '';
        this.isProjectChange = false;
        this.projectId = ''
      },
      error:(err: any) => {
        this.msg.error(`Tạo mới khu đất thất bại, lỗi ${err}`)
      }
    })
  }
}



