import { Component, Input, OnInit } from '@angular/core';
import { IChatModel } from 'src/app/core/models/chat';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  @Input() chats: IChatModel[];

  constructor() {}

  ngOnInit(): void {}
}
