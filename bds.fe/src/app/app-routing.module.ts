import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/main/admin/admin.component';
import { MainComponent } from './modules/main/main.component';
import { UserComponent } from './modules/main/user/user.component';
import { HomepageComponent } from './pages/user/homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'user',
        children: [
          {
            path: 'homepage',
            component: HomepageComponent
          }
        ]
      },
      {
        path: 'admin',
        component: AdminComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
