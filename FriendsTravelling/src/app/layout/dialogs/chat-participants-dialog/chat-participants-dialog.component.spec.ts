import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatParticipantsDialogComponent } from './chat-participants-dialog.component';

describe('ChatParticipantsDialogComponent', () => {
  let component: ChatParticipantsDialogComponent;
  let fixture: ComponentFixture<ChatParticipantsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatParticipantsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatParticipantsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
