import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onScrollDownClick($event: Event) {
    $event.preventDefault();
    window.scroll({
      top: 600,
      left: 0,
      behavior: 'smooth',
    });
  }
}
