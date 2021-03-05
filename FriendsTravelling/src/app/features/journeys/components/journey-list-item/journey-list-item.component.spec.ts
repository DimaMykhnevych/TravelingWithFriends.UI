import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyListItemComponent } from './journey-list-item.component';

describe('JourneyListItemComponent', () => {
  let component: JourneyListItemComponent;
  let fixture: ComponentFixture<JourneyListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneyListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
