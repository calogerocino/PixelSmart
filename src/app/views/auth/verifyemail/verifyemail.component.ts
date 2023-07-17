import { Component } from '@angular/core';
import { AuthService } from '../../../shared/servizi/auth.service';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.scss'],
})
export class VerifyemailComponent {
  constructor(public authService: AuthService) {}
}
