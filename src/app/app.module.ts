import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { CreateApplicationDialogComponent } from './shared/create-application-dialog/create-application-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AuthGuardService } from './providers/AuthGuard/auth-guard.service';
import { AuthenticationService } from './providers/authentication.service';
import { AuthComponent } from './login/auth/auth.component';
import { AdService } from './login/information/ad.service';
import { AdBannerComponent } from './login/information/ad-banner.component';
import { AdDirective } from './login/information/ad.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interception';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthComponent,
    AdBannerComponent,
    AdDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  entryComponents: [CreateApplicationDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true },
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true},
    },
    AuthGuardService,
    AuthenticationService,
    AdService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
