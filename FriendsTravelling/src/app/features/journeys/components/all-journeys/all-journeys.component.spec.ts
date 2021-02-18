import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJourneysComponent } from './all-journeys.component';

describe('AllJourneysComponent', () => {
  let component: AllJourneysComponent;
  let fixture: ComponentFixture<AllJourneysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllJourneysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllJourneysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
