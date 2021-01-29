import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public router: Router, private _authService: AuthService) {}

  public get isAuthenticated(): boolean {
    return this._authService.isAuthenticated();
  }

  onScrollDownClick($event: Event) {
    $event.preventDefault();
    window.scroll({
      top: 600,
      left: 0,
      behavior: 'smooth',
    });
  }
}
