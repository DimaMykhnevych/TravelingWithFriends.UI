import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/layout/material';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from 'src/app/layout/spinner/spinner.module';
import { RouterModule } from '@angular/router';
import { UserRequestsComponent } from './components/user-requests/user-requests.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { RequestListItemComponent } from './components/request-list-item/request-list-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserInboxRequestsComponent } from './components/user-inbox-requests/user-inbox-requests.component';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    UserRequestsComponent,
    RequestsListComponent,
    RequestListItemComponent,
    UserInboxRequestsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    RouterModule,
    TranslateModule,
    CoreModule,
    HttpClientModule,
  ],
})
export class JourneyRequestResponseModule {}
