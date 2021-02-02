import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthForm, AuthService } from '../../../../core/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
})
export class LoginViewComponent implements OnInit {
  public isLoginSucessfull: boolean = true;
  constructor(private _auth: AuthService, private _router: Router) {}

  public ngOnInit(): void {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/myPage']);
    }
  }

  public login(value: AuthForm): void {
    this._auth.authorize(value).subscribe((isAuthorized: boolean) => {
      if (isAuthorized) {
        this._router.navigate(['/myPage']);
      } else {
        this.isLoginSucessfull = false;
      }
    });
  }

  public register(): void {
    this._router.navigate(['/register']);
  }
}
