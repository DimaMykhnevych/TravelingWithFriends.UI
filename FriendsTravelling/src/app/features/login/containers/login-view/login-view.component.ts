import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginErrorCodes } from 'src/app/core/auth/enums/login-errors-code.enum';
import { AuthForm, AuthResponse, AuthService } from '../../../../core/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
})
export class LoginViewComponent implements OnInit {
  public authResponse: AuthResponse;
  constructor(private _auth: AuthService, private _router: Router) {}

  public ngOnInit(): void {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/profile/journeys']);
    }
  }

  public login(value: AuthForm): void {
    this._auth.authorize(value).subscribe((authResponse: AuthResponse) => {
      if (authResponse.isAuthorized) {
        this._router.navigate(['/profile/journeys']);
      } else {
        this.authResponse = authResponse;
      }
    });
  }

  public register(): void {
    this._router.navigate(['/register']);
  }

  public isInvalidCredentials(): boolean {
    return (
      this.authResponse?.loginErrorCode ===
      LoginErrorCodes.InvalidUsernameOrPassword
    );
  }

  public isEmailConfirmationRequired(): boolean {
    return (
      this.authResponse?.loginErrorCode ===
      LoginErrorCodes.EmailConfirmationRequired
    );
  }
}
