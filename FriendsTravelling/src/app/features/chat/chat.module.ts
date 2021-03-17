import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/layout/material';
import { ChatsPageComponent } from './components/chats-page/chats-page.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatListItsmComponent } from './components/chat-list-item/chat-list-item.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SpinnerModule } from 'src/app/layout/spinner/spinner.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ChatAreaComponent } from './components/chat-area/chat-area.component';

@NgModule({
  declarations: [
    ChatsPageComponent,
    ChatListComponent,
    ChatListItsmComponent,
    ChatAreaComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    NgScrollbarModule,
    SpinnerModule,
    TranslateModule,
    RouterModule,
  ],
})
export class ChatModule {}
