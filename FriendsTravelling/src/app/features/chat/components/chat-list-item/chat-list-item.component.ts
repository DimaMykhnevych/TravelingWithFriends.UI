import { Component, Input, OnInit } from '@angular/core';
import { IUserInfo } from 'src/app/core/auth';
import { IChatModel } from 'src/app/core/models/chat';
import { UserProfileService } from 'src/app/features/personal-page/services/user-profile.service';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss'],
})
export class ChatListItsmComponent implements OnInit {
  @Input() chat: IChatModel;

  ngOnInit(): void {}
}
