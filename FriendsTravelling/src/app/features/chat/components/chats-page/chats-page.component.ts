import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IUserInfo, UserInfoService } from 'src/app/core/auth';
import { IChatModel } from 'src/app/core/models/chat';
import { DialogService } from 'src/app/layout/dialogs/serveices/dialog.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chats-page',
  templateUrl: './chats-page.component.html',
  styleUrls: ['./chats-page.component.scss'],
})
export class ChatsPageComponent implements OnInit {
  public chats: IChatModel[];
  public isLoaded: boolean = false;
  public currentUserInfo: IUserInfo;
  constructor(
    private _chatService: ChatService,
    private _userInfoService: UserInfoService,
    private _router: Router,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getUserChats();
  }

  public getUserChats(): void {
    this._userInfoService
      .loadUserInfo()
      .pipe(
        switchMap((userInfo: IUserInfo) => {
          this.currentUserInfo = userInfo;
          return this._chatService.getUserChats(userInfo.userId);
        })
      )
      .subscribe((resp) => {
        this.chats = resp;
        this.isLoaded = true;
      });
  }

  public onChatCreatorClick(chatCreatorId: number): void {
    if (this.currentUserInfo.userId === chatCreatorId) {
      this._router.navigate(['/profile']);
    } else {
      this._router.navigate(['/profile/user'], {
        queryParams: {
          userId: chatCreatorId,
        },
      });
    }
  }
  public onParticipantsListClick(chatId: number): void {
    this._chatService.getChatParticipants(chatId).subscribe((resp) => {
      this._dialogService.openChatParticipantsDialog({
        users: resp,
        currentUserInfo: this.currentUserInfo,
      });
    });
  }
}
