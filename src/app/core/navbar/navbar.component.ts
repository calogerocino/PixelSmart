import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../shared/servizi/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/app.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public authService: AuthService,
    public store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
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
