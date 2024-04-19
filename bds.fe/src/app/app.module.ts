import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/main/user/header/header.component';
import { FooterComponent } from './modules/main/user/footer/footer.component';
import { AdminComponent } from './modules/main/admin/admin.component';
import { UserComponent } from './modules/main/user/user.component';
import { MainComponent } from './modules/main/main.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { HomepageComponent } from './pages/user/homepage/homepage.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ProjectDetailComponent } from './pages/user/project-detail/project-detail.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ProjectManagerComponent } from './pages/admin/project-manager/project-manager.component';
import { AddProjectComponent } from './pages/admin/add-project/add-project.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    UserComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    DashboardComponent,
    ProjectDetailComponent,
    ProjectManagerComponent,
    AddProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    NzInputModule,
    NzPaginationModule,
    NzBreadCrumbModule,
    NzFlexModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzDividerModule,
    NzCarouselModule,
    NzSliderModule,
    NzSelectModule,
    NzInputNumberModule,
    NzModalModule,
    NzDatePickerModule,
    NzBadgeModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
