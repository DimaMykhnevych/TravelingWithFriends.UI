import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class ChatAreaComponent implements OnInit {
  public chatId: number;
  public userId: number;
  public messages: IMessageModel[] = [];
  public txtMessage: string = '';
  public isMessageSending = false;
  public currentChat: IChatModel;
  public needToScroll: boolean = true;
  public isLoading: boolean = true;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

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
        this.needToScroll = true;
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

  public isAvatarNeedToBeDisplayed(
    messageCreatorId: number,
    i: number
  ): boolean {
    return (
      !this.isMyMessage(messageCreatorId) && this.isNextMessageHasSameSender(i)
    );
  }

  public isMyMessage(messageCreatorId: number): boolean {
    return messageCreatorId === this.userId;
  }

  public isNextMessageHasSameSender(i: number): boolean {
    if (i != 0) {
      return this.messages[i].sender.id !== this.messages[i - 1].sender.id;
    }
    return true;
  }

  private getChatInfo(): void {
    this._chatService.getChatById(this.chatId).subscribe((resp: IChatModel) => {
      this.currentChat = resp;
    });
  }

  private subscribeToEvents(): void {
    this._chatHub.messageReceived.subscribe((message: IMessageModel) => {
      this.messages.push(message);
      this.needToScroll = true;
    });
  }

  private getRouteValues(): void {
    this.chatId = this._route.snapshot.queryParams['chatId'];
  }

  private getMessages(): void {
    this._messageService.getChatMessages(this.chatId).subscribe((messages) => {
      this.messages = messages;
      this.isLoading = false;
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

  public scrollToBottom(): void {
    try {
      if (this.needToScroll) {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        this.needToScroll = false;
      }
    } catch (err) {}
  }
}
