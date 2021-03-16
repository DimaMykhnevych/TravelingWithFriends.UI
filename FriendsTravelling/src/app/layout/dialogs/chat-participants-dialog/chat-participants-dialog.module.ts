import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatParticipantsDialogComponent } from './chat-participants-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ChatParticipantsDialogComponent,
    UserListComponent,
    UserListItemComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
})
export class ChatParticipantsDialogModule {}
