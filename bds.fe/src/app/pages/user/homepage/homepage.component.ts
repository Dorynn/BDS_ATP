import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  newProjectList: any = [
    {
      title: 'Thành phố thông minh giữa lòng Hà Nội',
      projectName: 'Vinhome smart city',
      description: 'Là đại đô thị khởi sinh từ sóng với hàng loạt đại tiện ích giải trí dẫn đầu xu hướng thế giới như: Tổ hợp biển tạo sóng Royal Wave Park, quảng trường Kinh đô ánh sáng...',
      location: 'Tây mỗ, Hà Đông, Hà Nội',
      minRange: 1.9,
      maxRange: 18,
      imgUrl: 'https://storage.googleapis.com/vinhomes-data-02/styles/images_1520_x_680/public/2021_06/3_1624089856.jpg?itok=3lwZzTfH'
    },
    {
      title: 'Thành phố thông minh giữa lòng Hà Nội',
      projectName: 'Vinhome smart city 2',
      description: 'Là đại đô thị khởi sinh từ sóng với hàng loạt đại tiện ích giải trí dẫn đầu xu hướng thế giới như: Tổ hợp biển tạo sóng Royal Wave Park, quảng trường Kinh đô ánh sáng...',
      location: 'Tây mỗ, Hà Đông, Hà Nội',
      minRange: 1.9,
      maxRange: 18,
      imgUrl: 'https://storage.googleapis.com/vinhomes-data-02/styles/images_1520_x_680/public/2021_06/3_1624089856.jpg?itok=3lwZzTfH'
    },
    {
      title: 'Thành phố thông minh giữa lòng Hà Nội',
      projectName: 'Vinhome smart city 3',
      description: 'Là đại đô thị khởi sinh từ sóng với hàng loạt đại tiện ích giải trí dẫn đầu xu hướng thế giới như: Tổ hợp biển tạo sóng Royal Wave Park, quảng trường Kinh đô ánh sáng...',
      location: 'Tây mỗ, Hà Đông, Hà Nội',
      minRange: 1.9,
      maxRange: 18,
      imgUrl: 'https://storage.googleapis.com/vinhomes-data-02/styles/images_1520_x_680/public/2021_06/3_1624089856.jpg?itok=3lwZzTfH'
    },
  ];
  rangeMoney: number[] = [0, 100];
  formatterDollar = (value: number): string => `$ ${value}`;
  parserDollar = (value: string): string => value.replace('$ ', '');
}
