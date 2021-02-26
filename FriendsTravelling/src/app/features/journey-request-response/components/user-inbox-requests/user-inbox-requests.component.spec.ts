import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInboxRequestsComponent } from './user-inbox-requests.component';

describe('UserInboxRequestsComponent', () => {
  let component: UserInboxRequestsComponent;
  let fixture: ComponentFixture<UserInboxRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInboxRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInboxRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
