import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalProfileSummaryComponent } from './personal-profile-summary.component';

describe('PersonalProfileSummaryComponent', () => {
  let component: PersonalProfileSummaryComponent;
  let fixture: ComponentFixture<PersonalProfileSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalProfileSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalProfileSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
