import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IChatModel } from 'src/app/core/models/chat';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  @Input() chats: IChatModel[];
  @Output()
  onChatCreatorClick: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  onParticipantsListClick: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  onStartMessaging: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  public onChatCreatorBtnClick(chatCreatorId: number): void {
    this.onChatCreatorClick.emit(chatCreatorId);
  }
  public onParticipantsListBtnClick(chatId: number): void {
    this.onParticipantsListClick.emit(chatId);
  }

  public onChatBtnClick(chatId: number): void {
    this.onStartMessaging.emit(chatId);
  }
}
