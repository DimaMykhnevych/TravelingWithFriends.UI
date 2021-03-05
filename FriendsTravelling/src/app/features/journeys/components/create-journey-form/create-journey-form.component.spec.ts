import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJourneyFormComponent } from './create-journey-form.component';

describe('CreateJourneyFormComponent', () => {
  let component: CreateJourneyFormComponent;
  let fixture: ComponentFixture<CreateJourneyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJourneyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJourneyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
