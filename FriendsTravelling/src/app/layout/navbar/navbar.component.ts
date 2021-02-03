import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNil } from 'lodash';
import { AuthService, UserInfoService } from 'src/app/core/auth';
import { AppSettings } from 'src/app/core/settings';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public imagePath: string = '';

  constructor(
    private _authService: AuthService,
    private router: Router,
    private _userService: UserInfoService
  ) {}

  ngOnInit(): void {
    this._userService.loadUserInfo().subscribe((response) => {
      this.imagePath = response.profileImagePath || '';
    });
  }

  public createImgPath(): string {
    if (!isNil(this.imagePath) && this.imagePath != '') {
      return `${AppSettings.hubHost}/${this.imagePath}`;
    }
    return '../../../../assets/images/avatar-default.png';
  }

  public OnLogOutButtonCLick(): void {
    this._authService.unauthorize();
    this.router.navigate(['/home']);
  }
}
