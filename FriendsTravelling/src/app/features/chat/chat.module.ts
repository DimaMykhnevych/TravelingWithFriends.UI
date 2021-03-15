import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/layout/material';
import { ChatsPageComponent } from './components/chats-page/chats-page.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatListItsmComponent } from './components/chat-list-item/chat-list-item.component';

@NgModule({
  declarations: [ChatsPageComponent, ChatListComponent, ChatListItsmComponent],
  imports: [CommonModule, CoreModule, MaterialModule],
})
export class ChatModule {}
