import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneysListComponent } from './journeys-list.component';

describe('JourneysListComponent', () => {
  let component: JourneysListComponent;
  let fixture: ComponentFixture<JourneysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneysListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
