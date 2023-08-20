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
  passwordForm: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<AppState>,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idu = params.get('id');
      this.getDatiUtenteID(idu);
      this.createFormPassword();
    });
  }

  createFormUser(
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
      cellulare: new FormControl({ value: Cellulare, disabled: true }, [
        Validators.required,
        Validators.minLength(10),
      ]),
      indirizzo: new FormControl({ value: Indirizzo, disabled: true }),
    });
  }

  createFormPassword() {
    this.passwordForm = new FormGroup({
      passwordold: new FormControl('', [Validators.minLength(10)]),
      passwordnew: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ]),
      passwordnewre: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ]),
    });
  }

  async getDatiUtenteID(idu: string) {
    this.ffuser = await this.userService.Searchuser(idu);
    this.createFormUser(
      this.ffuser.displayName,
      this.ffuser.email,
      this.ffuser.cellulare,
      ''
    );
  }

  onSubmit() {}
}
