import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJourneyFormComponent } from './search-journey-form.component';

describe('SearchJourneyFormComponent', () => {
  let component: SearchJourneyFormComponent;
  let fixture: ComponentFixture<SearchJourneyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchJourneyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJourneyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
