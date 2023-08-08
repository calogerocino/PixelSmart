import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../shared/servizi/auth.service';
import { Observable, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UserState } from 'src/app/shared/app.state';
import { getUser } from 'src/app/views/auth/state/auth.selector';
import { User2 } from 'src/app/shared/servizi/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  connectedUser: Observable<User2>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public authService: AuthService,
    private store: Store<UserState>
  ) {}
  ngOnInit(): void {
    //  this.connectedUser = this.store(getUser).subscribe((data)=> {
    //   console.log(data)
    //  });
  }

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
