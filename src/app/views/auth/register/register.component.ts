import { Component, OnInit } from "@angular/core";
// import { Router } from "@angular/router";
// import { AuthModule } from "../auth.module";
import { AuthService } from "../../../shared/servizi/auth.service";
// import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  // onRegister(form: NgForm) {
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   this.authService
  //     .signUp(email, password)
  //     .subscribe((data) => console.log(data));

  //   const Toast = Swal.mixin({
  //     toast: true,
  //     position: 'top-end',
  //     timer: 3000,
  //     timerProgressBar: true
  //   })
  //   Toast.fire(`Registrato con successo, attendi l'approvazione per potere accedere!`, '', 'info')

  //   this.router.navigate(["/auth/login"]);
  // }
}
