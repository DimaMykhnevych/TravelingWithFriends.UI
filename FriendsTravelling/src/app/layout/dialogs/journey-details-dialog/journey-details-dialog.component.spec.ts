import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyDetailsDialogComponent } from './journey-details-dialog.component';

describe('JourneyDetailsDialogComponent', () => {
  let component: JourneyDetailsDialogComponent;
  let fixture: ComponentFixture<JourneyDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneyDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
