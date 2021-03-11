import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, RegistrationForm } from '../../../../core/auth';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/core/settings';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IAppUserModel } from 'src/app/core/models/app-user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss'],
  providers: [UserService],
})
export class RegisterViewComponent implements OnInit {
  public isUserNameAlreadyTaken: boolean = false;
  public isAddingUser: boolean = false;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _userService: UserService,
    private _toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/myPage']);
    }
  }

  public register(value: RegistrationForm): void {
    this.isAddingUser = true;
    value.clientURI = AppSettings.confirmEmailPath;
    this._userService
      .create(value)
      .pipe(
        catchError((error) => {
          return this.onCatchError(error);
        })
      )
      .subscribe((user: IAppUserModel) => {
        if (user.id) {
          this.onUserAdded(user);
        }
      });
  }

  private onCatchError(error): Observable<any> {
    if (error.status === 400) {
      this.isUserNameAlreadyTaken = true;
      this.isAddingUser = false;
    }
    return of({});
  }

  private onUserAdded(user: IAppUserModel): void {
    this.isAddingUser = false;
    this._toastr.success(
      `You are registered successfully. 
       Confirmation email was send to ${user.email}`
    );
    this._router.navigate(['/login']);
  }

  public login(): void {
    this._router.navigate(['/login']);
  }
}
