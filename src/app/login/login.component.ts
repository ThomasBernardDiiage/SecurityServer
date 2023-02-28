import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../providers/authentication.service';
import { first } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdService } from './information/ad.service';
import { AdItem } from './information/ad-item';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  errorMessage = '';
  secret = '61aa8ca8-b3ed-43e4-9f39-8c961d0fb2d4';

  clickCount = 0;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private _adService: AdService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ads: AdItem[] = this._adService.getAds();

  ngOnInit() {
    const secret = new URLSearchParams(window.location.search).get('secret');

    if (secret) {
      this.secret = secret;
    }

    this.ads = this._adService.getAds();
  }

  onClick() {
    this.clickCount++;
  }

  login() {
    this.isLoading = true;

    var email: string = this.form.value.email;
    var password: string = this.form.value.password;

    this.authenticationService
      .grant(email, password, this.secret)
      .pipe(first())
      .subscribe({
        next: (grant) => {
          //this.router.navigateByUrl("main")
          this.errorMessage = '';
          location.href = grant.uri + '?code=' + grant.grantCode;
          this.isLoading = false;
          this.form.controls['email'].setValue('');
          this.form.controls['password'].setValue('');
        },
        error: () => {
          this.form.controls['password'].setValue('');
          this.isLoading = false;
          this.errorMessage = 'Error';
        },
      });
  }
}
