import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/servizi/auth.service';
import { UserService } from 'src/app/shared/servizi/user.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss'],
})
export class ProfiloComponent implements OnInit {
  ffuser: any;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService // private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idu = params.get('id');
      this.getDatiUtenteID(idu);
    });
  }
  async getDatiUtenteID(idu: string) {
    this.ffuser = await this.userService.getFFUser(idu);
    this.ffuser = this.ffuser.reduce((acc, it) => [...acc, ...it]);
  }
}
