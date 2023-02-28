import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ApplicationComponent } from './application/application.component';
import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { DetailsApplicationComponent } from './application/details-application/details-application.component';
import { HighlightDirective } from './application/highlight.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DetailsUserComponent } from './user/details-user/details-user.component';
import { ProfileComponent } from './profile/profile.component';
import { InfoNewsComponent } from '../login/information/info-news.component';
import { InfoComponent } from '../login/information/info.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from '../interceptors/auth-interception';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'user', component: UserComponent },
      { path: 'application', component: ApplicationComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ApplicationComponent,
    MainComponent,
    UserComponent,
    DetailsApplicationComponent,
    HighlightDirective,
    DetailsUserComponent,
    ProfileComponent,
    InfoNewsComponent,
    InfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
})
export class MainModule {}
