import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
  providers: [UserService],
})
export class EmailConfirmationComponent implements OnInit {
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;
  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail(): void {
    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];

    this._userService.confirmEmail({ token: token, email: email }).subscribe(
      (resp) => {
        this.showSuccess = true;
      },
      (error) => {
        this.showError = true;
        this.errorMessage = error;
      }
    );
  }
}
