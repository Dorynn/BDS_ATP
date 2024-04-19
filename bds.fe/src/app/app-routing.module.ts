import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './modules/main/admin/admin.component';
import { MainComponent } from './modules/main/main.component';
import { UserComponent } from './modules/main/user/user.component';
import { AddProjectComponent } from './pages/admin/add-project/add-project.component';
import { HomepageComponent } from './pages/user/homepage/homepage.component';
import { ProjectDetailComponent } from './pages/user/project-detail/project-detail.component';

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
          },
          {
            path: 'project-detail/:id',
            component: ProjectDetailComponent
          }
        ]
      },
      {
        path: 'admin',
        children: [
          {
            path: 'add-project',
            component: AddProjectComponent
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
