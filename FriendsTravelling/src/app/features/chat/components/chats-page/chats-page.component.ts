import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { IUserInfo, UserInfoService } from 'src/app/core/auth';
import { IChatModel } from 'src/app/core/models/chat';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chats-page',
  templateUrl: './chats-page.component.html',
  styleUrls: ['./chats-page.component.scss'],
})
export class ChatsPageComponent implements OnInit {
  public chats: IChatModel[];
  constructor(
    private _chatService: ChatService,
    private _userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    this.getUserChats();
  }

  public getUserChats(): void {
    this._userInfoService
      .loadUserInfo()
      .pipe(
        switchMap((userInfo: IUserInfo) => {
          return this._chatService.getUserChats(userInfo.userId);
        })
      )
      .subscribe((resp) => {
        this.chats = resp;
        console.log(this.chats);
      });
  }
}
