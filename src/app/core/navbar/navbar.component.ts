import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  Renderer2,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Router } from "@angular/router";
// import { AuthService } from "src/app/shared/guard/auth.service";
 import { AuthService } from "../../shared/servizi/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle("sidebar-open");
  }

  // onLogout(e: Event ) {
  //   e.preventDefault();
  //   localStorage.removeItem("user");
  //   this.authService.isLoggedIn = false;
  //   this.authService.user = null;
  //   if (!localStorage.getItem("user")) {
  //     this.router.navigate(["/auth/login"]);
  //   }
  // }
}
