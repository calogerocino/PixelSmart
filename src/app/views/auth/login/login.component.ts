import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { AuthService } from 'src/app/shared/guard/auth.service';
import { AuthService } from "../../../shared/servizi/auth.service";

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, public authService:AuthService) { }

  ngOnInit(): void {
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  // onLoggedin(form: NgForm) {
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   this.authService.signIn(email, password).subscribe((data: any) => {
  //     console.log(data);
  //     const expirationDate = new Date(
  //       new Date().getTime() + data.expiresIn * 1000
  //     );
  //     this.authService.createUser(
  //       data.email,
  //       data.localId,
  //       data.idToken,
  //       expirationDate
  //     );
  //     this.authService.isLoggedIn = true;
  //     localStorage.setItem('user', JSON.stringify(this.authService.user));
  //     this.router.navigate([this.returnUrl]);
  //   });
  // }
}
