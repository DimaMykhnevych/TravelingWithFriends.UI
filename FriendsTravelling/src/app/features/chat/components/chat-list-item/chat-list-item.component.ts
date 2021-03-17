import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IChatModel } from 'src/app/core/models/chat';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss'],
})
export class ChatListItsmComponent implements OnInit {
  @Input() chat: IChatModel;
  @Output()
  onChatCreatorClick: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  onParticipantsListClick: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  onStartMessaging: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {}

  public onChatCreatorBtnClick(): void {
    this.onChatCreatorClick.emit(this.chat.journeyCreator.id);
  }

  public onParticipantsListBtnClick(): void {
    this.onParticipantsListClick.emit(this.chat.id);
  }

  public onChatBtnClick(): void {
    this.onStartMessaging.emit(this.chat.id);
  }
}
