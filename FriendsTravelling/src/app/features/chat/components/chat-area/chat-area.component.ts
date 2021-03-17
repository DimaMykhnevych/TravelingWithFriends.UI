import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService as ChatHub } from 'src/app/core/chat/chat.service';
import { IMessageModel } from 'src/app/core/models/message';
import { CurrentUserService } from 'src/app/core/permission/services';
import { MessageService } from '../../services/message.service';
import { ChatService } from '../../services/chat.service';
import { IChatModel } from 'src/app/core/models/chat';
import { AppSettings } from 'src/app/core/settings';
import { isNil } from 'lodash';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss'],
})
export class ChatAreaComponent implements OnInit, AfterViewInit {
  public chatId: number;
  public userId: number;
  public messages: IMessageModel[] = [];
  public txtMessage: string = '';
  public isMessageSending = false;
  public currentChat: IChatModel;
  public container: HTMLElement;

  constructor(
    private _route: ActivatedRoute,
    private _messageService: MessageService,
    private _currentUserService: CurrentUserService,
    private _chatHub: ChatHub,
    private _chatService: ChatService
  ) {}

  public ngOnInit(): void {
    this.subscribeToEvents();
    this.getRouteValues();
    this.getMessages();
    this.getChatInfo();
    this.getCurrentUser();
  }
  public ngAfterViewInit() {
    // this.container = document.getElementById('messages-box');
    // this.container.scrollIntoView(false);
    // this.container.scroll({
    //   top: this.container.scrollHeight,
    //   left: 0,
    //   behavior: 'smooth',
    // });
  }

  public sendMessage(): void {
    if (this.txtMessage) {
      this.isMessageSending = true;
      const message: IMessageModel = {
        content: this.txtMessage,
        sendingDate: new Date(),
        appUserId: this.userId,
        chatId: this.chatId,
      };
      this._messageService.postMessage(message).subscribe((resp) => {
        this.isMessageSending = false;
        this.messages.push(resp);
        this.txtMessage = '';
        this._chatHub.sendChatMessage(resp);
      });
    }
  }

  public createImgPath(imgPath: string): string {
    if (!isNil(imgPath) && imgPath != '') {
      return `${AppSettings.hubHost}/${imgPath}`;
    }
    return 'assets/images/avatar-default.png';
  }

  public isMyMessage(messageCreatorId: number): boolean {
    return messageCreatorId === this.userId;
  }

  private getChatInfo(): void {
    this._chatService.getChatById(this.chatId).subscribe((resp: IChatModel) => {
      this.currentChat = resp;
    });
  }

  private subscribeToEvents(): void {
    this._chatHub.messageReceived.subscribe((message: IMessageModel) => {
      this.messages.push(message);
    });
  }

  private getRouteValues(): void {
    this.chatId = this._route.snapshot.queryParams['chatId'];
  }

  private getMessages(): void {
    this._messageService.getChatMessages(this.chatId).subscribe((messages) => {
      this.messages = messages;
    });
  }

  private getCurrentUser(): void {
    const currentUserInfo = this._currentUserService.userInfo;
    if (currentUserInfo.userId) {
      this.userId = currentUserInfo.userId;
      return;
    }
    this._currentUserService.userInfoChanged.subscribe((resp) => {
      this.userId = resp.userId;
    });
  }
}
