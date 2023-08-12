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
export class NavbarComponent implements OnInit {
  connectedUser: Observable<User>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public authService: AuthService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.connectedUser = this.store.select(getUser).pipe(map(data => {
      return data
    }));
  }

  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }
}
