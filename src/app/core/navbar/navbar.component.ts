import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../shared/servizi/auth.service';
import { Observable, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/app.state';
import { getUser } from 'src/app/views/auth/state/auth.selector';
import { User } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user: any;
  connectedUser: Observable<User> = this.store.select(getUser);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly authService: AuthService,
    private readonly store: Store<AppState>
  ) {
    this.user = this.authService.userData;
  }

  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  signOut(event: Event) {
    this.authService.SignOut(event);
  }
}
