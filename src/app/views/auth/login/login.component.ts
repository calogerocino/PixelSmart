import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/servizi/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/app.state';
import { loginStart } from 'src/app/views/auth/state/auth.action';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public authService: AuthService, public store: Store<AppState>) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLoginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(loginStart({ email, password }));
    this.authService.SignIn(email, password);
  }

  // authService.SignIn(userEmail.value, userPassword.value)
}
