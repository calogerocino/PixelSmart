import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/app.state';
import { Observable } from 'rxjs';
import { getUser } from '../../auth/state/auth.selector';
import { UserService } from 'src/app/shared/servizi/user.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss'],
})
export class ProfiloComponent implements OnInit {
  connectedUser$: Observable<User> = this.store.select(getUser);
  ffuser: any;
  user: User;
  userForm: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<AppState>,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idu = params.get('id');
      this.getDatiUtenteID(idu);
    });
  }

  createForm(
    DisplayName: string,
    Email: string,
    Cellulare: string,
    Indirizzo: string
  ) {
    this.userForm = new FormGroup({
      displayName: new FormControl(DisplayName, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(Email, [Validators.required, Validators.email]),
      cellulare: new FormControl(Cellulare, [
        Validators.required,
        Validators.minLength(10),
      ]),
      indirizzo: new FormControl(Indirizzo),
    });
  }

  async getDatiUtenteID(idu: string) {
    this.ffuser = await this.userService.Searchuser(idu);
    this.createForm(
      this.ffuser.displayName,
      this.ffuser.email,
      this.ffuser.cellulare,
      ''
    );
  }

  onSubmit() {}
}
