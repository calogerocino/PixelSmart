import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { StoreModule } from "@ngrx/store";
import {AuthReducer} from './state/auth.reducer';
import { AUTH_STATE_NAME } from "./state/auth.selector";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./state/auth.effects";
import { SHARED_STATE_NAME } from "src/app/shared/store/shared.selectors";
import { SharedReducer } from "src/app/shared/store/shared.reducer";

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
      },
      {
        path: "login",
        component: LoginComponent,
        data: { title: "Login" },
      },
      {
        path: "register",
        component: RegisterComponent,
        data: { title: "Registrazione" },
      },
      {
        path: "resetpassword",
        component: ResetpasswordComponent,
        data: { title: "Reset Password" },
      },
      {
        path: "verifyemail",
        component: VerifyemailComponent,
        data: { title: "Verifica mail" },
      },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent,ResetpasswordComponent, VerifyemailComponent,
    LoadingSpinnerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
    StoreModule.forFeature(SHARED_STATE_NAME, SharedReducer),
    EffectsModule.forFeature([AuthEffects]),
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
