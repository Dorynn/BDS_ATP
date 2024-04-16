import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './modules/main/admin/admin.component';
import { MainComponent } from './modules/main/main.component';
import { UserComponent } from './modules/main/user/user.component';
import { HomepageComponent } from './pages/user/homepage/homepage.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/admin' },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent
      },
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
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
