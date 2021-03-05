import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJourneyFormContainerComponent } from './search-journey-form-container.component';

describe('SearchJourneyFormContainerComponent', () => {
  let component: SearchJourneyFormContainerComponent;
  let fixture: ComponentFixture<SearchJourneyFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchJourneyFormContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJourneyFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
